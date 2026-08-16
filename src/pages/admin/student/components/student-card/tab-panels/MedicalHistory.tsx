import { Text } from "@mantine/core";

import { useStudentDetail } from "@/hooks/students/useStudentDetail";
import type { AdditionalField, Fields } from "@/types/students";
import { renderStudentValue } from "@/utils/students/studentValue";
import {
  StudentInfoColumn,
  StudentInfoLayout,
  StudentInfoRow,
} from "../StudentInfoLayout";

type MedicalAdditionalField = AdditionalField & {
  value: string;
};

export default function MedicalHistory() {
  const { data, isPending, error } = useStudentDetail();

  const fields = [...(data?.data.medical_history ?? [])].sort(
    (a, b) => a.form_order - b.form_order,
  );

  const midpoint = Math.ceil(fields.length / 2);

  return (
    <StudentInfoLayout isPending={isPending} error={error}>
      <StudentInfoColumn>
        {fields.slice(0, midpoint).map((field) => (
          <MedicalField key={field.id} field={field} />
        ))}
      </StudentInfoColumn>

      <StudentInfoColumn>
        {fields.slice(midpoint).map((field) => (
          <MedicalField key={field.id} field={field} />
        ))}
      </StudentInfoColumn>
    </StudentInfoLayout>
  );
}

function MedicalField({ field }: { field: Fields }) {
  const additionalFields = field.additional_fields.filter(
    (field): field is MedicalAdditionalField => field.value !== null,
  );

  return (
    <StudentInfoRow
      label={field.name}
      value={
        <>
          <Text
            size="sm"
            fw={500}
            style={{
              lineHeight: 1.4,
              overflowWrap: "anywhere",
            }}
          >
            {renderStudentValue(field.value, "MM/YYYY")}
          </Text>

          {additionalFields.map((additionalField) => (
            <Text
              key={additionalField.id}
              size="sm"
              fs="italic"
              c="dimmed"
              style={{
                lineHeight: 1.4,
                overflowWrap: "anywhere",
              }}
            >
              {additionalField.name === "Vaccine Name"
                ? renderStudentValue(additionalField.value, "MM/YYYY")
                : `${additionalField.name}: ${renderStudentValue(
                    additionalField.value,
                    "MM/YYYY",
                  )}`}
            </Text>
          ))}
        </>
      }
    />
  );
}
