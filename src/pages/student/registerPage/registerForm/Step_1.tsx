import { Stack, Text } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";

import type { RegisterFormValues } from "../../../../types/student-register";

import DynamicFormField from "../../components/DynamicFormField";

import { getActiveAdditionalFields } from "../../utils/register-form/getActiveAdditionalFields";


interface Step_1Props {
  data: String[];
  form: UseFormReturnType<RegisterFormValues>;
}

export default function Step_1({ data, form }: Step_1Props) {

  const handleValueChange = (
    fieldId: number,
    value: string | string[] | null
  ) => {
    form.setFieldValue("personal_info", {
      ...form.values.personal_info,
      [fieldId]: value ?? "",
    });
  };


  const Map_Data = () => {
    return data.map((item) => {
      const selectedValue = form.values.personal_info[item.id];

      const activeAdditionalFields = getActiveAdditionalFields(
        item.additional_fields,
        selectedValue
      );

      return (
        <Stack key={item.id} gap="md">
          <DynamicFormField
            field={item}
            value={form.values.personal_info[item.id] ?? ""}
            error={form.errors[`personal_info.${item.id}`]}
            onChange={(value) => handleValueChange(item.id, value)}
          />

          {/* Render nested conditional fields if available */}
          {activeAdditionalFields && activeAdditionalFields.length > 0 && (
            <Stack gap="md" pl="md">
              {activeAdditionalFields.map((subField) => (
                <DynamicFormField
                  key={subField.id}
                  field={subField}
                  value={form.values.personal_info[subField.id] ?? ""}
                  error={form.errors[`personal_info.${subField.id}`]}
                  onChange={(value) =>
                    handleValueChange(subField.id, value)
                  }
                />
              ))}            </Stack>
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