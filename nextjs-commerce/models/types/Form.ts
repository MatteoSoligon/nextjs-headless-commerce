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
    schema: z.ZodTypeAny;
    defaultValues: Partial<T>;
}

export type ZodSchema = z.ZodObject<Record<string, z.ZodTypeAny>>;