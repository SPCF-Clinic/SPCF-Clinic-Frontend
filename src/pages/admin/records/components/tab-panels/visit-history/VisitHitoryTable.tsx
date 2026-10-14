import { Table } from "@mantine/core";

import { AppTable, type ColumnDef } from "@/components/AppTable";
import QueryError from "@/components/QueryError";
import SexIcon from "@/components/SexIcon";
import { useCheckIns } from "@/hooks/check-ins/useCheckIns";
import { dayjs } from "@/services/dayjs";
import type { CheckInStudent } from "@/types/check-ins";

const COLUMNS: ColumnDef[] = [
  { title: "Timestamp", w: "15%" },
  { title: "Name" },
  { title: "Age", w: 96 },
  { title: "Sex", w: "10%" },
  { title: "Chief Complaint", w: "15%" },
  { title: "Grade Level/Year", w: "15%" },
];

const getStudentLevel = (student: CheckInStudent) => {
  if (student.grade_level) {
    return student.grade_level;
  } else if (student.year_level) {
    return `${student.year_level} - ${student.course}`;
  }
};

export default function VisitHistoryTable() {
  const { data, isPending, error, refetch } = useCheckIns();

  if (error) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  return (
    <AppTable
      columns={COLUMNS}
      isPending={isPending}
      data={data?.data.check_ins}
    >
      {data?.data.check_ins.map((checkIn) => (
        <Table.Tr key={checkIn.id}>
          <Table.Td c="dimmed">
            {dayjs(checkIn.check_in_time).format("MM-D-YYYY LT")}
          </Table.Td>
          <Table.Td>{checkIn.user.name}</Table.Td>
          <Table.Td>{checkIn.user.age}</Table.Td>
          <Table.Td>
            <SexIcon sex={checkIn.user.gender} />
          </Table.Td>
          <Table.Td>{checkIn.reason_for_visit}</Table.Td>
          <Table.Td>{getStudentLevel(checkIn.user)}</Table.Td>
        </Table.Tr>
      ))}
    </AppTable>
  );
}
