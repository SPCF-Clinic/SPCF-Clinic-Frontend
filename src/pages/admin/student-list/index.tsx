import { Group, Paper, Stack, Text } from "@mantine/core";
import { useRef } from "react";

import AppPager from "@/components/AppPager";
import { PrintButton } from "@/components/PrintButton";
import { SearchFilter } from "@/components/SearchFilter";
import { useStudents } from "@/hooks/students/useStudents";
import { useAppPage } from "@/hooks/useAppPage";
import StudentTable from "./components/student-table/StudentTable";

export default function StudentList() {
  const { data, isFetching } = useStudents();
  const [page, setPage] = useAppPage();

  const contentRef = useRef<HTMLDivElement>(null);
  const totalPages = data?.data.pagination.total_pages ?? 1;

  return (
    <Paper flex={1} p="lg" radius="lg" withBorder>
      <Stack ref={contentRef}>
        <Text component="h2" fw="bold" size="xl">
          List of Students {data ? `(${data.data.pagination.total})` : ""}
        </Text>
        <Group justify="space-between">
          <SearchFilter
            queryKey="student_id"
            textInputProps={{
              placeholder: "Search Student",
              loading: isFetching,
            }}
            onCommit={() => {
              if (page !== 1) setPage(1);
            }}
          />
          <PrintButton printOptions={{ contentRef }} />
        </Group>
        <StudentTable />
        {totalPages > 1 && (
          <AppPager
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </Stack>
    </Paper>
  );
}
