import { Box, Center, Loader, Stack } from "@mantine/core";

import { useStudentDetail } from "@/hooks/students/useStudentDetail";
import { useStudentCheckIns } from "@/hooks/students/useStudentCheckIns";
import Breadcrumbs from "./components/Breadcrumbs";
import StudentCard from "./components/student-card/StudentCard";
import VisitLog from "./components/visit-log/VisitLog";

export default function StudentProfile() {
  const studentQuery = useStudentDetail();
  const visitLogQuery = useStudentCheckIns();

  const isLoading = studentQuery.isLoading || visitLogQuery.isLoading;

  if (isLoading) {
    return (
      <Center flex={1}>
        <Loader />
      </Center>
    );
  }

  return (
    <Stack flex={1}>
      <Box ms={2}>
        <Breadcrumbs />
      </Box>
      <Stack flex={1}>
        <StudentCard />
        <VisitLog />
      </Stack>
    </Stack>
  );
}
