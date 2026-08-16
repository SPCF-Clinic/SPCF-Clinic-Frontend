import { Group, Paper, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

import { PrintButton } from "@/components/PrintButton";
import { studentQueries } from "@/query/students";
import StudentTable from "./components/student-table/StudentTable";
import TableFilters from "./components/student-table/TableFilters";

export default function StudentList() {
  const [student_id] = useQueryState("student_id", { defaultValue: "" });
  const { data } = useQuery(studentQueries.list({ student_id }));

  return (
    <Paper className="printable-area" p="lg" radius="lg" withBorder>
      <Stack>
        <Text component="h2" fw="bold" size="xl">
          List of Students {data ? `(${data.data.pagination.total})` : ""}
        </Text>
        <Group justify="space-between">
          <TableFilters />
          <PrintButton className="no-print" />
        </Group>
        <StudentTable />
      </Stack>
    </Paper>
  );
}
