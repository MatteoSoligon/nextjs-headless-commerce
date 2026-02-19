'use client';
import { FC } from "react";
import Form from "./Form";
import formBuilder, { FieldConfig } from "@/utils/formBuilder";
import { z } from "zod"; 
import { useTranslations } from "next-intl";

const TestForm: FC = () => {
  const t = useTranslations("Errors");
  const formNames = useTranslations("Form");
  const formConfig: FieldConfig[] = [
    {
      label: formNames("firstName"),
      name: "firstName",
      type: "text",
      zod: (tfn: (k: string) => string) => z.string().min(1, tfn("required")),
    },
    {
      name: "sureName",
      type: "text",
      zod: (tfn: (k: string) => string) => z.string().optional(),
      default: "",
      visible: (values) => values.firstName !== "John",

    },
    {
      name: "lastName",
      type: "text",
      zod: (tfn: (k: string) => string) => z.string().min(1, tfn("required")),
    },
    {
      name: "email",
      type: "text",
      zod: (tfn: (k: string) => string) =>
        z
          .string()
          .min(1, tfn("required"))
          .email({ message: tfn("invalidEmail") }),
    },
    {
      name: "phone",
      type: "text",
      zod: (tfn: (k: string) => string) =>
        z
          .string()
          .min(1, tfn("required"))
          .refine((v) => /^\+?[0-9\s\-()]{7,}$/.test(v), {
            message: tfn("invalidPhone"),
          }),
    },
    {
      name: "address",
      type: "text",
      default: "",
      zod: () => z.string().optional(),
    },
    {
      name: "preferences",
      type: "checkbox",
      zod: (tfn: (k: string) => string) => z.boolean().refine((v) => v === true, {
        message: tfn("required"),
      }),
    },
    {
      name: "contactMethod",
      type: "radio",
      options: ["email", "phone"],
      zod: (tfn: (k: string) => string) => z.string().min(1, tfn("required")),
    },
    {
      name: "state",
      type: "select",
      zod: (tfn: (k: string) => string) => z.string().min(1, tfn("required")),
      options: ["AL", "AK", "AZ", "AR", "CA"],
    },
    {
      name: "subscribe",
      type: "switch",
      default: false,
      zod: () => z.boolean().optional(),
    },
  ];

  
  const formConfigData = formBuilder(formConfig, (k) => t(k));
  return <Form formConfigData={formConfigData} />;
};

export default TestForm;
