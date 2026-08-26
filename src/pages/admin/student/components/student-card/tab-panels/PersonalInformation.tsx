import { useMemo } from "react";

import { useStudentDetail } from "@/hooks/students/useStudentDetail";
import type { Fields } from "@/types/students";
import {
  getPersonalInfoWithoutName,
  getStudentFullName,
} from "@/utils/students/studentName";
import { renderStudentValue } from "@/utils/students/studentValue";
import {
  StudentInfoColumn,
  StudentInfoLayout,
  StudentInfoRow,
} from "../StudentInfoLayout";

type DisplayField = Omit<Fields, "id" | "form_order"> & {
  id: number | string;
};

export default function PersonalInformation() {
  const { data, isPending, error } = useStudentDetail();

  const fields = useMemo<DisplayField[]>(() => {
    if (!data) {
      return [];
    }

    const personalInfo = [...data.data.personal_info].sort(
      (a, b) => a.form_order - b.form_order,
    );

    const fullName = getStudentFullName(personalInfo);

    return [
      {
        id: "name",
        name: "Name",
        value: fullName,
        additional_fields: [],
      },
      ...getPersonalInfoWithoutName(personalInfo),
    ];
  }, [data]);

  const midpoint = Math.ceil(fields.length / 2);

  return (
    <StudentInfoLayout isPending={isPending} error={error}>
      <StudentInfoColumn>
        {fields.slice(0, midpoint).map((field) => (
          <FieldRow key={field.id} field={field} />
        ))}
      </StudentInfoColumn>

      <StudentInfoColumn>
        {fields.slice(midpoint).map((field) => (
          <FieldRow key={field.id} field={field} />
        ))}
      </StudentInfoColumn>
    </StudentInfoLayout>
  );
}

function FieldRow({ field }: { field: DisplayField }) {
  return (
    <>
      <StudentInfoRow
        label={field.name}
        value={renderStudentValue(field.value)}
      />

      {field.additional_fields
        .filter((additionalField) => additionalField.value !== null)
        .map((additionalField) => (
          <StudentInfoRow
            key={additionalField.id}
            label={additionalField.name}
            value={
              additionalField.value
                ? renderStudentValue(additionalField.value)
                : ""
            }
          />
        ))}
    </>
  );
}
