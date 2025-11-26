import type { ComponentType, ReactNode } from "react";
import { cn } from "../../lib/utils";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormContext,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
} from "../../ui/form";
import { Input } from "../../ui/input";

type IconComponent = ComponentType<{ className?: string }>;

export interface FormTextInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  label?: ReactNode;
  placeholder?: string;
  description?: ReactNode;
  type?: string;
  startIcon?: IconComponent;
  endAdornment?: ReactNode;
  inputProps?: React.ComponentProps<typeof Input>;
  className?: string;
}

export function FormTextInput<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  name,
  label,
  placeholder,
  description,
  type = "text",
  startIcon: StartIcon,
  endAdornment,
  inputProps,
  className,
}: FormTextInputProps<TFieldValues, TName>) {
  const { control } = useFormContext<TFieldValues>();

  return (
    <FormField<TFieldValues, TName>
      control={control}
      name={name}
      render={({ field }: { field: ControllerRenderProps<TFieldValues, TName> }) => (
        <FormItem className={className}>
          {label ? <FormLabel>{label}</FormLabel> : null}
          <div className="relative">
            {StartIcon ? (
              <StartIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            ) : null}
            <FormControl>
              <Input
                {...inputProps}
                {...field}
                type={inputProps?.type ?? type}
                placeholder={inputProps?.placeholder ?? placeholder}
                className={cn(
                  StartIcon && "pl-9",
                  endAdornment && "pr-10",
                  inputProps?.className,
                )}
              />
            </FormControl>
            {endAdornment}
          </div>
          {description ? <FormDescription>{description}</FormDescription> : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

