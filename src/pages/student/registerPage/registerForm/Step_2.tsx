import { Stack, Text } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";

import type {
  MedicalHistoryField,
  AdditionalField,
} from "../../../../types/student-register";
import { data_type } from "../../utils/register.form";

import TextInput1 from "../../components/TextInput";
import DateInput from "../../components/DateInput";
import RadioInput from "../../components/RadioInput";
import DropdownInput from "../../components/DropdownInput";
import CheckboxInput from "../../components/CheckboxInput";
import SectionDivider from "../../components/Divider";

interface RegisterFormValues {
  name: string;
  student_id: string;
  password: string;
  personal_info: Record<number, string>;
  medical_history: Record<number, string | string[]>;
}

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

  const renderField = (field: MedicalHistoryField | AdditionalField) => {
    const fieldError = form.errors[`medical_history.${field.id}`];
    const currentValue = form.values.medical_history[field.id] ?? "";
    const hasOptions = Array.isArray(field.options) && field.options.length > 0;

    const baseType = data_type(field.type?.name);

    const isDropdown =
      baseType === "Dropdown" ||
      (hasOptions && baseType !== "Radio" && baseType !== "Checkbox");

    if (isDropdown) {
      return (
        <DropdownInput
          key={field.id}
          label={field.name}
          withAsterisk={"is_required" in field ? field.is_required : true}
          error={fieldError}
          data={field.options}
          value={currentValue as string}
          onChange={(val) => handleValueChange(field.id, val)}
        />
      );
    }

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
            withAsterisk={"is_required" in field ? field.is_required : false}
            error={fieldError}
            value={currentValue as string}
            onChange={(val) => handleValueChange(field.id, val)}
          />
        );

      case "Date":
        return (
          <DateInput
            key={field.id}
            label={field.name}
            withAsterisk={"is_required" in field ? field.is_required : false}
            error={fieldError}
            value={currentValue as string}
            onChange={(val) => handleValueChange(field.id, val)}
          />
        );

      case "Radio":
        return (
          <RadioInput
            key={field.id}
            label={field.name}
            withAsterisk={"is_required" in field ? field.is_required : false}
            error={fieldError}
            data={field.options}
            value={currentValue as string}
            onChange={(val) => handleValueChange(field.id, val)}
          />
        );

      case "Checkbox":
        return (
          <CheckboxInput
            key={field.id}
            label={field.name}
            withAsterisk={"is_required" in field ? field.is_required : false}
            error={fieldError}
            options={field.options}
            data={(Array.isArray(currentValue) ? currentValue : []) as string[]}
            onChange={(vals) => handleValueChange(field.id, vals)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Text fz={32} fw={700}>
        Medical & Vaccination History
      </Text>
      <Text>Please provide the student's medical and vaccination history.</Text>

      <Stack gap="md" mt="md">
        {data.map((item) => {
          const parentValue = form.values.medical_history[item.id];

          const activeAdditionalFields = item.additional_fields?.filter(
            (subField) =>
              subField.required_with_field_value === parentValue ||
              !subField.required_with_field_value
          );

          return (
            <Stack key={item.id} gap="md">
              {renderField(item)}

              {activeAdditionalFields && activeAdditionalFields.length > 0 && (
                <Stack gap="md" pl="md">
                  {activeAdditionalFields.some(
                    (sf) => sf.name === "Vaccine Name"
                  ) && (
                    <SectionDivider descriptionLabel="If you are uncertain about the exact date, please just indicate the year it was administered." />
                  )}
                  {activeAdditionalFields.map((subField) =>
                    renderField(subField)
                  )}
                </Stack>
              )}
            </Stack>
          );
        })}
      </Stack>
    </>
  );
}