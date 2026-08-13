import { Paper, Skeleton, Stack, Table, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

import QueryError from "@/components/QueryError";
import { dashboardQueries } from "@/query/dashboard";
import { dayjs } from "@/services/dayjs";
import { AppTable, type ColumnDef } from "@/components/AppTable";

export default function DashboardInClinic() {
  return (
    <Paper radius="lg" p="lg">
      <Stack>
        <Text component="h2" fw={600} size="xl">
          Currently in Clinic
        </Text>

        <ClinicTable />
      </Stack>
    </Paper>
  );
}

const COLUMNS: ColumnDef[] = [
  { title: "Student Number", w: "20%" },
  { title: "Name" },
  { title: "Bed Assignment", w: "15%" },
  { title: "Time", w: "10%" },
];

function ClinicTable() {
  const { data, isPending, error, refetch } = useQuery(
    dashboardQueries.dashboard(),
  );

  if (error) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  const rows = isPending
    ? Array.from({ length: 5 }).map((_, index) => (
        <Table.Tr key={index}>
          <Table.Td>
            <Skeleton height={16} width="80%" radius="md" />
          </Table.Td>
          <Table.Td>
            <Skeleton height={16} width="70%" radius="md" />
          </Table.Td>
          <Table.Td>
            <Skeleton height={16} width="50%" radius="md" />
          </Table.Td>
          <Table.Td>
            <Skeleton height={16} width="80%" radius="md" />
          </Table.Td>
        </Table.Tr>
      ))
    : data.data.currently_in_clinic.map((student) => (
        <Table.Tr key={student.student_id}>
          <Table.Td fw={600}>{student.student_id}</Table.Td>
          <Table.Td>{student.name}</Table.Td>
          <Table.Td>{student.bed_id || "--"}</Table.Td>
          <Table.Td>{dayjs(student.check_in_time).format("LT")}</Table.Td>
        </Table.Tr>
      ));

  return <AppTable columns={COLUMNS}>{rows}</AppTable>;
}
