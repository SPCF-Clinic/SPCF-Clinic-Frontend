import { Text, Group } from "@mantine/core";

import type {
  PersonalInfoField,
  MedicalHistoryField,
} from "../../../../types/student-register";

import SectionDivider from "../../components/Divider";

interface Step_4Props {
  step1_data: PersonalInfoField[];
  step2_data: MedicalHistoryField[];
  personal_info: Record<number, string>;
  medical_history: Record<number, string>;
}

export default function Step_4({
  step1_data,
  step2_data,
  personal_info,
  medical_history,
}: Step_4Props) {

const mapData = (data: any, input: any) => {
  console.log("Personal Information", data);
  console.log("Personal Info Input", input);

  const keys = Object.keys(input || {});

  // Helper to find a field by ID, searching top-level items and nested additional_fields
  const findFieldById = (targetId: string) => {
    const items = Array.isArray(data?.data)
      ? data.data
      : data?.data
      ? [data.data]
      : [];

    for (const item of items) {
      if (String(item?.id) === targetId) return item;

      if (Array.isArray(item?.additional_fields)) {
        const nestedMatch = item.additional_fields.find(
          (field: any) => String(field?.id) === targetId
        );
        if (nestedMatch) return nestedMatch;
      }
    }

    return null;
  };

  return (
    <>
      {keys.map((key) => {
        const stepItem = findFieldById(String(key));

        if (!stepItem) return null;

        const value = input[key];

        return (
          <Group key={key} justify="space-between" wrap="nowrap" mb="xs">
            <Text c="dimmed" size="sm">
              {stepItem.name}
            </Text>
            <Text fw={600} size="sm">
              {value}
            </Text>
          </Group>
        );
      })}
    </>
  );
};
  return (
    <>
      <Text fz={32} fw={700}>
        Review your Information
      </Text>

      <Text mb={5}>Check everything below before submitting </Text>

      <SectionDivider label="PERSONAL INFORMATION" />
      {mapData(step1_data, personal_info)}

      <SectionDivider label="MEDICAL HISTORY" />
      {mapData(step2_data, medical_history)}
    </>
  );
}
