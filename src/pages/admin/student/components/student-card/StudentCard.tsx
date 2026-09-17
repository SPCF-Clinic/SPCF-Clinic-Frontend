import { Card, Stack } from "@mantine/core";
import { useState } from "react";

import QueryError from "@/components/QueryError";
import { useStudentDetail } from "@/hooks/students/useStudentDetail";
import { getStudentFullName } from "@/utils/students/studentName";
import StudentCardHeader from "./StudentCardHeader";
import StudentCardTabs from "./StudentCardTabs";

export default function StudentCard() {
  const [isEditing, setIsEditing] = useState(false);
  const { data, isPending, error, refetch } = useStudentDetail();

  if (isPending) return;

  if (error) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  const fullName = getStudentFullName(data.data.personal_info);

  return (
    <Card radius="lg" p="lg" withBorder>
      <Stack gap="xl">
        <StudentCardHeader
          fullName={fullName}
          studentData={data.data}
          onEdit={() => setIsEditing(true)}
        /> 
        <Card.Section>
          <StudentCardTabs
            isEditing={isEditing}
            onCancelEdit={() => setIsEditing(false)}
          />
        </Card.Section>
      </Stack>
    </Card>
  );
}
