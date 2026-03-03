import { FieldConfig, FormConfigData, FormValues, ZodSchema } from "@/models/types/Form";
import { z } from "zod";

 
export const formBuilder = <T extends Record<string, unknown> = Record<string, unknown>>(fields: FieldConfig<T>[], t?: (key: string) => string) => {
	const shape: Record<string, z.ZodTypeAny> = {};
	const defaultValues: Partial<T> = {};
	const conditionalFields: { name: string; schema: z.ZodTypeAny; visible: (values: FormValues<T>) => boolean }[] = [];

	fields.forEach((f) => {
		let fieldSchema: z.ZodTypeAny;
		// If a zod schema is provided on the field, use it (call if it's a factory)
		if (f.zod) {
			const zodField = f.zod;
			fieldSchema = typeof zodField === "function" ? zodField(t ?? ((k: string) => k)) : zodField;
			(defaultValues as Record<string, unknown>)[f.name] = f.default ?? (fieldSchema instanceof z.ZodString ? "" : undefined);
		} else {
			switch (f.type) {
				case "radio":
					fieldSchema = z.enum(f.options as [string, ...string[]]);
					(defaultValues as Record<string, unknown>)[f.name] = f.default ?? f.options?.[0] ?? "";
					break;
				case "switch":
					fieldSchema = z.boolean();
					(defaultValues as Record<string, unknown>)[f.name] = f.default ?? false;
					break;
				case "checkbox":
					fieldSchema = z.boolean();
					(defaultValues as Record<string, unknown>)[f.name] = f.default ?? false;
					break;
				case "number":
					fieldSchema = z.number();
					(defaultValues as Record<string, unknown>)[f.name] = f.default ?? 0;
					break;
				default:
					fieldSchema = z.string();
					(defaultValues as Record<string, unknown>)[f.name] = f.default ?? "";
					break;
			}
		}

		// Handle visible condition: conditionally visible fields get an optional base schema
		// and are validated via superRefine only when visible
		if (typeof f.visible === "function") {
			conditionalFields.push({ name: f.name, schema: fieldSchema, visible: f.visible as (values: FormValues<T>) => boolean });
			shape[f.name] = z.any().optional();
		} else {
			shape[f.name] = fieldSchema;
		}
	});

	let schema: z.ZodTypeAny = z.object(shape);

	// Add conditional validation for fields whose visibility depends on form values
	if (conditionalFields.length > 0) {
		schema = (schema as ZodSchema).superRefine((data, ctx) => {
			for (const cf of conditionalFields) {
				if (cf.visible(data as FormValues<T>)) {
					const result = cf.schema.safeParse(data[cf.name]);
					if (!result.success) {
						for (const issue of result.error.issues) {
							ctx.addIssue({
								...issue,
								path: [cf.name, ...issue.path],
							});
						}
					}
				}
			}
		});
	}

	return {
		fields,
		schema,
		defaultValues,
	} as FormConfigData<T>;
};

export default formBuilder;