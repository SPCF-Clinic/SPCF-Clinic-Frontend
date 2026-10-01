import { Stack, Text } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";

import type {
  MedicalHistoryField,
  RegisterFormValues
} from "../../../../types/student-register";

import DynamicFormField from "../../components/DynamicFormField";
import SectionDivider from "../../components/Divider";

import { getActiveAdditionalFields } from "../../utils/register-form/getActiveAdditionalFields";


interface Step_2Props {
  data: MedicalHistoryField[];
  form: UseFormReturnType<RegisterFormValues>;
}

export default function Step_2({ data, form }: Step_2Props) {
  const handleValueChange = (
    fieldId: number,
    value: string | string[] | null
  ) => {
    form.setFieldValue("medical_history", {
      ...form.values.medical_history,
      [fieldId]: value ?? "",
    });
  };


  return (
    <>
      <Text fz={32} fw={700}>
        Medical & Vaccination History
      </Text>
      <Text>Please provide the student's medical and vaccination history.</Text>

      <Stack gap="md" mt="md">
        {data.map((item) => {
          const selectedValue = form.values.medical_history[item.id];

          const activeAdditionalFields = getActiveAdditionalFields(
            item.additional_fields,
            selectedValue
          );

          return (
            <Stack key={item.id} gap="md">
              <DynamicFormField
                field={item}
                value={form.values.medical_history[item.id] ?? ""}
                error={form.errors[`medical_history.${item.id}`]}
                onChange={(value) => handleValueChange(item.id, value)}
              />

              {activeAdditionalFields && activeAdditionalFields.length > 0 && (
                <Stack gap="md" pl="md">
                  {activeAdditionalFields.some(
                    (sf) => sf.name === "Vaccine Name"
                  ) && (
                      <SectionDivider descriptionLabel="If you are uncertain about the exact date, please just indicate the year it was administered." />
                    )}
                  {activeAdditionalFields.map((subField) => (
                    <DynamicFormField
                      key={subField.id}
                      field={subField}
                      value={form.values.medical_history[subField.id] ?? ""}
                      error={form.errors[`medical_history.${subField.id}`]}
                      onChange={(value) =>
                        handleValueChange(subField.id, value)
                      }
                    />
                  ))}
                </Stack>
              )}
            </Stack>
          );
        })}
      </Stack>
    </>
  );
}