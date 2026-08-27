import { Stack, Text } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";

import type { PersonalInfoField } from "../../../../types/student-register";
import { data_type } from "../../utils/register.form";

import TextInput1 from "../../components/TextInput";
import DateInput from "../../components/DateInput";
import RadioInput from "../../components/RadioInput";
import DropdownInput from "../../components/DropdownInput";
import SectionDivider from "../../components/Divider";

interface RegisterFormValues {
  name: string;
  student_id: string;
  password: string;
  personal_info: Record<number, string>;
  medical_history: Record<number, string>;
}

interface Step_1Props {
  data: PersonalInfoField[];
  form: UseFormReturnType<RegisterFormValues>;
}

export default function Step_1({ data, form }: Step_1Props) {
  // Helper to update field value in state
  const handleValueChange = (fieldId: number, value: string | null) => {
    form.setFieldValue("personal_info", {
      ...form.values.personal_info,
      [fieldId]: value ?? "",
    });
  };

  // Helper function to render an individual input dynamically
  const renderField = (field: any) => {
    const typeLabel = data_type(field.type.name);
    const fieldError = form.errors[`personal_info.${field.id}`];
    const currentValue = form.values.personal_info[field.id] ?? "";

    switch (typeLabel) {
      case "Divider":
        return <SectionDivider key={field.id} label={field.name} />;

      case "Text":
        return (
          <TextInput1
            key={field.id}
            label={field.name}
            withAsterisk={field.is_required}
            error={fieldError}
            value={currentValue}
            onChange={(val) => handleValueChange(field.id, val)}
          />
        );

      case "Date":
        return (
          <DateInput
            key={field.id}
            label={field.name}
            withAsterisk={field.is_required}
            error={fieldError}
            value={currentValue}
            onChange={(val) => handleValueChange(field.id, val)}
          />
        );

      case "Radio":
        return (
          <RadioInput
            key={field.id}
            label={field.name}
            withAsterisk={field.is_required}
            error={fieldError}
            data={field.options}
            value={currentValue}
            onChange={(val) => handleValueChange(field.id, val)}
          />
        );

      case "Dropdown":
        return (
          <DropdownInput
            key={field.id}
            label={field.name}
            withAsterisk={field.is_required}
            error={fieldError}
            data={field.options}
            value={currentValue}
            onChange={(val) => handleValueChange(field.id, val)}
          />
        );

      default:
        return null;
    }
  };

  const Map_Data = () => {
    return data.map((item) => {
      const selectedValue = form.values.personal_info[item.id];

      // Filter dependent fields based on the parent selected value
      const activeAdditionalFields = item.additional_fields?.filter(
        (subField: any) => subField.required_with_field_value === selectedValue
      );

      return (
        <Stack key={item.id} gap="md">
          {renderField(item)}

          {/* Render nested conditional fields if available */}
          {activeAdditionalFields && activeAdditionalFields.length > 0 && (
            <Stack gap="md" pl="md">
              {activeAdditionalFields.map((subField: any) => renderField(subField))}
            </Stack>
          )}
        </Stack>
      );
    });
  };

  return (
    <>
      <Text fz={33} fw={700}>
        Personal Information
      </Text>
      <Text>Please provide the student's basic personal details.</Text>
      <Stack gap="md" mt="md">
        {Map_Data()}
      </Stack>
    </>
  );
}