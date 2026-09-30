import TextInput1 from "./TextInput";
import DateInput from "./DateInput";
import RadioInput from "./RadioInput";
import DropdownInput from "./DropdownInput";
import SectionDivider from "./Divider";
import CheckboxInput from "./CheckboxInput";

import { data_type } from "../utils/register-form/register.form";

interface DynamicFormFieldProps {
  field: any;
  value: string | string[];
  error?: React.ReactNode;
  onChange: (value: string | string[] | null) => void;
}

export default function DynamicFormField({
  field,
  value,
  error,
  onChange,
}: DynamicFormFieldProps) {
  const baseType = data_type(field.type?.name);

  const isRequired =
    "is_required" in field ? field.is_required : false;

  switch (baseType) {
    case "Divider":
      return (
        <SectionDivider
          key={field.id}
          label={field.name}
          descriptionLabel={field.description_text ?? ""}
        />
      );

    case "Text":
      return (
        <TextInput1
          key={field.id}
          label={field.name}
          withAsterisk={isRequired}
          error={error}
          value={value as string}
          onChange={(val) => onChange(val)}
        />
      );

    case "Date":
      return (
        <DateInput
          key={field.id}
          label={field.name}
          withAsterisk={isRequired}
          error={error}
          value={value as string}
          onChange={(val) => onChange(val)}
        />
      );

    case "Radio":
      return (
        <RadioInput
          key={field.id}
          label={field.name}
          description={field.description_text}
          withAsterisk={isRequired}
          error={error}
          data={field.options}
          value={value as string}
          onChange={(val) => onChange(val)}
        />
      );

    case "Checkbox":
      return (
        <CheckboxInput
          key={field.id}
          label={field.name}
          description={field.description_text}
          withAsterisk={isRequired}
          error={error}
          options={field.options}
          data={Array.isArray(value) ? value : []}
          onChange={(vals) => onChange(vals)}
        />
      );

    case "Dropdown":
      return (
        <DropdownInput
          key={field.id}
          label={field.name}
          withAsterisk={isRequired}
          error={error}
          data={field.options}
          value={value as string}
          onChange={(val) => onChange(val)}
        />
      );

    default:
      return null;
  }
}
