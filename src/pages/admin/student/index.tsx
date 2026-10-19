import { Box, Center, Grid, Loader, Stack } from "@mantine/core";

import { formatTitle } from "@/constants/titles";
import { useStudentCheckIns } from "@/hooks/students/useStudentCheckIns";
import { useStudentDetail } from "@/hooks/students/useStudentDetail";
import { useTimerRealtime } from "@/hooks/timers/useTimerRealtime";
import Breadcrumbs from "./components/Breadcrumbs";
import ContactPerson from "./components/ContactPerson";
import Illnesses from "./components/Illnesses";
import StudentActivityLogs from "./components/StudentActivityLogs";
import StudentBedTimer from "./components/StudentBedTimer";
import StudentCard from "./components/student-card/StudentCard";
import VisitLog from "./components/visit-log/VisitLog";

export default function StudentProfile() {
  const studentQuery = useStudentDetail();
  const visitLogQuery = useStudentCheckIns();

  useTimerRealtime();

  const studentName = studentQuery.data?.data.full_name || "Student Profile";
  const title = <title>{formatTitle(studentName)}</title>;

  const isLoading = studentQuery.isLoading || visitLogQuery.isLoading;

  if (isLoading || !studentQuery.data) {
    return (
      <>
        {title}
        <Center flex={1}>
          <Loader />
        </Center>
      </>
    );
  }

  return (
    <>
      {title}
      <Stack flex={1}>
        <Box ms={2}>
          <Breadcrumbs />
        </Box>
        <Grid gap="xs">
          <Grid.Col span={8.5}>
            <Stack>
              <StudentCard />
              <VisitLog />
            </Stack>
          </Grid.Col>
          <Grid.Col span={3.5}>
            <Stack>
              <StudentBedTimer />
              <ContactPerson />
              <Illnesses />
              <StudentActivityLogs studentNumber={studentQuery.data.data.id} />
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </>
  );
}
