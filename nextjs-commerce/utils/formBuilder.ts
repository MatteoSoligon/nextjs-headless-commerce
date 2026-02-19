import type React from "react";
import { z } from "zod";

export type FieldType =
	| "text"
	| "select"
	| "checkbox"
	| "switch"
	| "radio"
	| "password"
	| "number";

export type FormValues<T extends Record<string, unknown> = Record<string, unknown>> = T;

export type CustomValidator<T extends Record<string, unknown> = Record<string, unknown>> = (
	value: unknown,
	values: FormValues<T>
) => true | string | Promise<true | string>;

export type VisibleCondition<T extends Record<string, unknown> = Record<string, unknown>> = boolean | ((values: FormValues<T>) => boolean);

export type ValidationRules<T extends Record<string, unknown> = Record<string, unknown>> = {
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	pattern?: RegExp;
	custom?: CustomValidator<T>;
};

export type FieldConfig<T extends Record<string, unknown> = Record<string, unknown>> = {
	name: keyof T & string;
	type: FieldType;
	label?: string;
	labelKey?: string;
	options?: string[];
	zod?: z.ZodTypeAny | ((t: (k: string) => string) => z.ZodTypeAny);
	validation?: ValidationRules<T>;
	default?: T[keyof T];
	visible?: VisibleCondition<T>;
	uiProps?: Record<string, unknown>;
	uiComponent?: React.ComponentType;
};

export type FormConfigData<T extends Record<string, unknown> = Record<string, unknown>> = {
	fields: FieldConfig<T>[];
	schema: z.ZodObject<Record<string, z.ZodTypeAny>>;
	defaultValues: Partial<T>;
}
 
export const formBuilder = <T extends Record<string, unknown> = Record<string, unknown>>(fields: FieldConfig<T>[], t?: (key: string) => string) => {
	const shape: Record<string, z.ZodTypeAny> = {};
	const defaultValues: Partial<T> = {};

	fields.forEach((f) => {
		let schema: z.ZodTypeAny;

		// If a zod schema is provided on the field, use it (call if it's a factory)
		if (f.zod) {
			const zodField = f.zod;
			schema = typeof zodField === "function" ? zodField(t ?? ((k: string) => k)) : zodField;
			(defaultValues as Record<string, unknown>)[f.name] = f.default ?? (schema instanceof z.ZodString ? "" : undefined);
			shape[f.name] = schema;
			return;
		}

		switch (f.type) {
			case "radio":
				schema = z.enum(f.options as [string, ...string[]]);
				(defaultValues as Record<string, unknown>)[f.name] = f.default ?? f.options?.[0] ?? "";
				break;
			case "switch":
				schema = z.boolean();
				(defaultValues as Record<string, unknown>)[f.name] = f.default ?? false;
				break;
			case "checkbox":
				schema = z.boolean();
				(defaultValues as Record<string, unknown>)[f.name] = f.default ?? false;
				break;
			case "number":
				schema = z.number();
				(defaultValues as Record<string, unknown>)[f.name] = f.default ?? 0;
				break;
			default:
				schema = z.string();
				(defaultValues as Record<string, unknown>)[f.name] = f.default ?? "";
				break;
		}

		const v = f.validation;
		if (v) {
			if (v.required) {
				if (schema instanceof z.ZodString) schema = (schema as z.ZodString).min(1, "Required");
			}
			if (v.minLength && schema instanceof z.ZodString) {
				schema = (schema as z.ZodString).min(v.minLength, `Min ${v.minLength}`);
			}
			if (v.maxLength && schema instanceof z.ZodString) {
				schema = (schema as z.ZodString).max(v.maxLength, `Max ${v.maxLength}`);
			}
			if (v.pattern && schema instanceof z.ZodString) {
				schema = (schema as z.ZodString).regex(v.pattern, "Invalid format");
			}
			if (v.custom) {
				const custom = v.custom;
				schema = schema.superRefine((val, ctx) => {
					const res = custom(val, {} as FormValues<T>);
					if (res === true) return;
					if (typeof res === "string") {
						ctx.addIssue({ code: z.ZodIssueCode.custom, message: res });
					}
				});
			}
		}

		shape[f.name] = schema;
	});

	const schema = z.object(shape);

	return {
		fields,
		schema,
		defaultValues,
	} as FormConfigData<T>;
};

export default formBuilder;