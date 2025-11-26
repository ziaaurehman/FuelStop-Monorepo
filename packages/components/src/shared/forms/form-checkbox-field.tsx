import type { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { Checkbox } from "../../ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormContext,
  type FieldPath,
  type FieldValues,
} from "../../ui/form";

export interface FormCheckboxFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  label: ReactNode;
  description?: ReactNode;
  className?: string;
  labelClassName?: string;
}

export function FormCheckboxField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  name,
  label,
  description,
  className,
  labelClassName,
}: FormCheckboxFieldProps<TFieldValues, TName>) {
  const { control } = useFormContext<TFieldValues>();

  return (
    <FormField<TFieldValues, TName>
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex flex-row items-center space-x-3 space-y-0 rounded-md",
            className,
          )}
        >
          <FormControl>
            <Checkbox
              checked={!!field.value}
              onCheckedChange={(checked) => field.onChange(checked === true)}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel className={cn("text-sm font-medium", labelClassName)}>
              {label}
            </FormLabel>
            {description ? (
              <FormDescription>{description}</FormDescription>
            ) : null}
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}

