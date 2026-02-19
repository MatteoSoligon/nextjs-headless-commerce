"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/blocks";
import { useForm, Controller, SubmitHandler, ControllerFieldState, ControllerRenderProps } from "react-hook-form";
import {
  Button,
  Checkbox,
  Heading,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Switch,
} from "@/components/atoms";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectGroup } from "@radix-ui/react-select";
import { FC } from "react";

import { FieldConfig, FormConfigData } from "@/utils/formBuilder";
import DebouncedInput from "../blocks/DebouncedInput";


const Form: FC<{ formConfigData: FormConfigData }> = ({ formConfigData }) => {
  
  const { schema, defaultValues, fields } = formConfigData;

  const { control, handleSubmit, watch } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const values = watch();

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
  };

  const renderByType = (f: FieldConfig, field: ControllerRenderProps<Record<string, any>, string>, fieldState: ControllerFieldState) => {
    const label = f.label ?? f.name;
    switch (f.type) {
      case "select":
        return (
          <div>
            <SelectGroup>
              <Label htmlFor={field.name}>{label}</Label>
              <Select {...field}
                onValueChange={(value) => field.onChange(value)}
              >
                <SelectTrigger size="sm">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  {f.options?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </SelectGroup>
            <p>{fieldState.error?.message}</p>
          </div>
        );
      case "checkbox":
        return (
          <div>
            <div className="flex items-center gap-2">
              <Checkbox {...field} id={field.name}
              checked={field.value}
                    onCheckedChange={(checked: boolean | "indeterminate") =>
                      field.onChange(checked === true)
                    }
              />
              <Label htmlFor={field.name}>{label}</Label>
            </div>
            <p>{fieldState.error?.message}</p>
          </div>
        );
      case "radio":
        return (
          <div>
            <Label>{label}</Label>
            <RadioGroup
              value={field.value} onValueChange={field.onChange}
            >
              {f.options?.map((option, index) => (
                <div className="flex items-center gap-2" key={option}>
                  <RadioGroupItem value={option} id={`r${index}`} />
                  <Label htmlFor={`r${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
            <p>{fieldState.error?.message}</p>
          </div>
        );
      case "switch":
        return (
          <div>
            <div className="flex items-center gap-2">
              <Switch id={field.name} {...field}
                value={field.value}
                onChange={field.onChange}
              />
              <Label htmlFor={field.name}>{label}</Label>
            </div>
            <p>{fieldState.error?.message}</p>
          </div>
        );
      default:
        return (
          <div>
            <Label htmlFor={field.name}>{label}</Label>
            <DebouncedInput
              value={field.value}
              onChange={field.onChange}
            >
              {(debouncedProps) => (
                <Input {...field} id={field.name} {...debouncedProps} />
              )}
            </DebouncedInput>
            <p>{fieldState.error?.message}</p>
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <Heading level="h4">Example Form Section</Heading>

      {fields.map((f) => {
        // conditional visibility
        if (typeof f.visible === "function" && !f.visible(values)) return null;
        if (f.visible === false) return null;

        return (
          <Controller
            key={f.name}
            name={f.name}
            control={control}
            render={({ field, fieldState }) =>
              renderByType(f, field, fieldState)
            }
          />
        );
      })}

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Form;
