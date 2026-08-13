import { Paper, Stack, Table, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

import QueryError from "@/components/QueryError";
import { dashboardQueries } from "@/query/dashboard";
import { dayjs } from "@/services/dayjs";
import { AppTable, type ColumnDef } from "@/components/AppTable";
import classes from "./DashboardInClinic.module.css";

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
  { title: "Bed Assignment", w: "20%" },
  { title: "Time", w: "15%" },
];

function ClinicTable() {
  const { data, isPending, error, refetch } = useQuery(
    dashboardQueries.dashboard(),
  );

  if (error) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  return (
    <AppTable
      data={data?.data.currently_in_clinic}
      isPending={isPending}
      columns={COLUMNS}
      highlightOnHover
      classNames={{ table: classes.table }}
    >
      {data?.data.currently_in_clinic.map((student) => (
        <Table.Tr key={student.student_id}>
          <Table.Td fw={600}>{student.student_id}</Table.Td>
          <Table.Td>{student.name}</Table.Td>
          <Table.Td>{student.bed_id || "--"}</Table.Td>
          <Table.Td c="dimmed">
            {dayjs(student.check_in_time).format("LT")}
          </Table.Td>
        </Table.Tr>
      ))}
    </AppTable>
  );
}
