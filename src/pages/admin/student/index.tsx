import { Box, Stack } from "@mantine/core";

import Breadcrumbs from "./components/Breadcrumbs";
import StudentCard from "./components/student-card/StudentCard";

export default function StudentProfile() {
  return (
    <Stack flex={1}>
      <Box ms={2}>
        <Breadcrumbs />
      </Box>
      <Stack flex={1}>
        <StudentCard />
      </Stack>
    </Stack>
  );
}
