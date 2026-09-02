import { Card, Stack } from "@mantine/core";

import QueryError from "@/components/QueryError";
import { useStudentDetail } from "@/hooks/students/useStudentDetail";
import { getStudentFullName } from "@/utils/students/studentName";
import StudentCardHeader from "./StudentCardHeader";
import StudentCardTabs from "./StudentCardTabs";

export default function StudentCard() {
  const { data, isPending, error, refetch } = useStudentDetail();

  console.log(data)

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
          studentNumber={data.data.username}
        />
        <Card.Section>
          <StudentCardTabs />
        </Card.Section>
      </Stack>
    </Card>
  );
}
