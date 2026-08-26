import { Stack, Text } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";

import type { PersonalInfoField } from "../../../../types/register.form.field";
import { data_type } from "../../utils/register.form";

import TextInput1 from "../components/TextInput";
import DateInput from "../components/DateInput";
import RadioInput from "../components/RadioInput";
import DropdownInput from "../components/DropdownInput";
import SectionDivider from "../components/Divider";

interface RegisterFormValues {
  name: string;
  student_id: string;
  password: string;
  personal_info: Record<number, string>;
  medical_hsitory: Record<number, string>;
}
interface Step_1Props {
  data: PersonalInfoField[];
  form: UseFormReturnType<RegisterFormValues>;
}

export default function Step_1({ data, form }: Step_1Props) {
  const Map_Data = () => {
    return data.map((items) => {
      const typeLabel = data_type(items.type.name);

      return (
        <Stack key={items.id} gap="md">
          {typeLabel === "Divider" && <SectionDivider label={items.name} />}
          {typeLabel === "Text" && (
            <TextInput1
              label={items.name}
              value={form.values.personal_info[items.id] ?? ""}
              onChange={(value) => {
                form.setFieldValue("personal_info", {
                  ...form.values.personal_info,
                  [items.id]: value,
                });
              }}
            />
          )}
          {typeLabel === "Date" && (
            <DateInput
              label={items.name}
              value={form.values.personal_info[items.id] ?? ""}
              onChange={(value) => {
                form.setFieldValue("personal_info", {
                  ...form.values.personal_info,
                  [items.id]: value,
                });
              }}
            />
          )}
          {typeLabel === "Radio" && (
            <RadioInput
              label={items.name}
              data={items.options}
              value={form.values.personal_info[items.id]}
              onChange={(value) => {
                form.setFieldValue("personal_info", {
                  ...form.values.personal_info,
                  [items.id]: value,
                });
              }}
            />
          )}
          {typeLabel === "Dropdown" && (
            <DropdownInput
              label={items.name}
              data={items.options}
              value={form.values.personal_info[items.id]}
              onChange={(value) => {
                form.setFieldValue("personal_info", {
                  ...form.values.personal_info,
                  [items.id]: value,
                });
              }}
            />
          )}
        </Stack>
      );
    });
  };

  console.log(data);
  return (
    <>
      <Text fz={33} fw={700}>
        Personal Information
      </Text>
      <Text>Please provide the student's basic personal details.</Text>
      {Map_Data()}
    </>
  );
}
