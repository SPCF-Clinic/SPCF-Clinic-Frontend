import { Paper, Stack, Table, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { AppTable, type ColumnDef } from "@/components/AppTable";
import QueryError from "@/components/QueryError";
import { dashboardQueries } from "@/query/dashboard";
import { dayjs } from "@/services/dayjs";
import classes from "@/styles/OutlineTableRow.module.css";
import StatusModal from "../../modals/StatusModal";
import { useSingleCheckInDetails } from "@/hooks/check-ins/useSingleCheckInDetails";
import { preventNavigationOnHighlight } from "@/utils/preventNavigationOnHighlight";

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
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(
    null,
  );

  const { data, isPending, error, refetch } = useQuery(
    dashboardQueries.dashboard(),
  );

  const { data: checkInDetails, isPlaceholderData } =
    useSingleCheckInDetails(selectedStudentId);

  const handleClickRow = (id: number | undefined) => {
    if (!id) return;

    setSelectedStudentId(id);
  };

  useEffect(() => {
    const studentData = checkInDetails?.data;

    if (studentData && selectedStudentId !== null && !isPlaceholderData) {
      StatusModal.StudentInClinic(studentData, () => {
        setSelectedStudentId(null);
      });
    }
  }, [checkInDetails?.data, isPlaceholderData, selectedStudentId]);

  if (error) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  return (
    <AppTable
      data={data?.data.currently_in_clinic}
      isPending={isPending}
      columns={COLUMNS}
      highlightOnHover
    >
      {data?.data.currently_in_clinic.map((student) => (
        <Table.Tr
          className={classes.tr}
          key={student.id}
          onClick={preventNavigationOnHighlight(() =>
            handleClickRow(student.id),
          )}
        >
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
