"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/Components/ui/label";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

type CheckboxProps = {
  options: { label: string; value: string }[]; // Opciones de checkbox con label y value
  name: string; // Nombre del campo en el formulario
};

const CheckboxGroup: React.FC<CheckboxProps> = ({ options, name }) => {
  return (
    <FormField
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="w-full">
          <FormLabel>Availability</FormLabel>
          <FormControl>
            <div className="flex flex-col w-full  space-y-2">
              {options.map(option => (
                <label
                  key={option.value}
                  className="flex items-center space-x-2 p-2 border rounded-lg transition-colors duration-200 ease-in-out hover:bg-gray-100"
                >
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={field.value.includes(option.value)}
                    onChange={() => {
                      const newValue = field.value.includes(option.value)
                        ? field.value.filter(
                            (val: string) => val !== option.value
                          )
                        : [...field.value, option.value];
                      field.onChange(newValue);
                    }}
                    className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-800">{option.label}</span>
                </label>
              ))}
            </div>
          </FormControl>
          {fieldState.error && (
            <FormMessage>{fieldState.error.message}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};

type TimeSlotProps = {
  options: { label: string; value: string }[]; // Opciones de tiempo con label y value
  name: string; // Nombre del campo en el formulario
};

const TimeSlot: React.FC<TimeSlotProps> = ({ options, name }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{name}</FormLabel>
          <FormControl>
            <div className="flex flex-col">
              {options.map(option => (
                <label
                  key={option.value}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={field.value.includes(option.value)}
                    onChange={() => {
                      const newValue = field.value.includes(option.value)
                        ? field.value.filter(
                            (val: string) => val !== option.value
                          )
                        : [...field.value, option.value];
                      field.onChange(newValue); // Actualiza el valor del campo
                    }}
                    className="form-checkbox"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </FormControl>
          {fieldState.error && (
            <FormMessage>{fieldState.error.message}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  CheckboxGroup,
  TimeSlot,
};
