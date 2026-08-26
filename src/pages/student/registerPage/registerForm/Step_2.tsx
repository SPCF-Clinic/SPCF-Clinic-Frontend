import { Stack, Text } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";

import type {
  MedicalHistoryField,
  AdditionalField,
} from "../../../../types/register.form.field";
import { data_type } from "../../utils/register.form";

import TextInput1 from "../components/TextInput";
import DateInput from "../components/DateInput";
import RadioInput from "../components/RadioInput";
import DropdownInput from "../components/DropdownInput";
import SectionDivider from "../components/Divider";
import CheckboxInput from "../components/CheckboxInput";

interface RegisterFormValues {
  name: string;
  student_id: string;
  password: string;
  personal_info: Record<number, string>;
  medical_history: Record<number, string>;
}
interface Step_2Props {
  data: MedicalHistoryField[];
  form: UseFormReturnType<RegisterFormValues>;
}
export default function Step_2({ data, form }: Step_2Props) {
  console.log(data);
  console.log("form", form.values);

  const Map_Additional_Fields = (data: AdditionalField[]) => {
    return data.map((additional) => {
      const additional_fields_type = data_type(additional.type.name);
      console.log(additional);
      return (
        <div key={additional.id}>
          {additional.name === "Vaccine Name" && (
            <SectionDivider
              descriptionLabel={
                "If you are uncertain about the exact date, please just indicate the year it was administered."
              }
            />
          )}
          {additional_fields_type === "Text" && (
            <TextInput1
              label={additional.name}
              value={form.values.medical_history[additional.id] ?? ""}
              onChange={(value) => {
                form.setFieldValue("medical_history", {
                  ...form.values.medical_history,
                  [additional.id]: value,
                });
              }}
            />
          )}
        </div>
      );
    });
  };

  const Map_Data = () => {
    return data.map((items) => {
      const typeLabel = data_type(items.type.name);

      return (
        <Stack key={items.id} gap="md">
          {typeLabel === "Divider" && (
            <SectionDivider
              label={items.name}
              descriptionLabel={items.description_text ?? ""}
            />
          )}
          {typeLabel === "Text" && (
            <TextInput1
              label={items.name}
              value={form.values.medical_history[items.id] ?? ""}
              onChange={(value) => {
                form.setFieldValue("medical_history", {
                  ...form.values.medical_history,
                  [items.id]: value,
                });
              }}
            />
          )}
          {typeLabel === "Date" && (
            <DateInput
              label={items.name}
              value={form.values.medical_history[items.id] ?? ""}
              onChange={(value) => {
                form.setFieldValue("medical_history", {
                  ...form.values.medical_history,
                  [items.id]: value,
                });
              }}
            />
          )}
          {typeLabel === "Radio" && (
            <RadioInput
              label={items.name}
              data={items.options}
              value={form.values.medical_history[items.id]}
              onChange={(value) => {
                form.setFieldValue("medical_history", {
                  ...form.values.medical_history,
                  [items.id]: value,
                });
              }}
            />
          )}
          {typeLabel === "Dropdown" && (
            <DropdownInput
              label={items.name}
              data={items.options}
              value={form.values.medical_history[items.id] ?? ""}
              onChange={(value) => {
                form.setFieldValue("medical_history", {
                  ...form.values.medical_history,
                  [items.id]: value,
                });
              }}
            />
          )}
          {typeLabel === "Checkbox" && (
            <CheckboxInput
              label={items.name}
              options={items.options}
              data={form.values.medical_history[items.id] ??""}
              onChange={(values) => {
                form.setFieldValue("medical_history", {
                  ...form.values.medical_history,
                  [items.id]: values,
                });
              }}
            />
          )}
          {items.additional_fields.length === 0
            ? ""
            : Map_Additional_Fields(items.additional_fields)}
        </Stack>
      );
    });
  };

  return (
    <>
      <Text fz={32} fw={700}>
        Medical & Vaccination History
      </Text>
      <Text>Please provide the student's basic personal details.</Text>
      {Map_Data()}
    </>
  );
}
