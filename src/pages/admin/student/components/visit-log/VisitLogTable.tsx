import { Table } from "@mantine/core";

import { AppTable, type ColumnDef } from "@/components/AppTable";
import { useStudentCheckIns } from "@/hooks/students/useStudentCheckIns";
import { dayjs } from "@/services/dayjs";
import classes from "@/styles/OutlineTableRow.module.css";
import QueryError from "@/components/QueryError";

import VisitModal from "@/pages/admin/modals/VisitModal";

const COLUMNS: ColumnDef[] = [
  { title: "Timestamp" },
  { title: "Chief Complain" },
  { title: "Medicine" },
];

export default function VisitLogTable() {
  const { data, isPending, error, refetch } = useStudentCheckIns();

  if (error) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  console.log("VisitLogTable data:", data);

  return (
    <AppTable
      columns={COLUMNS}
      isPending={isPending}
      data={data?.data.check_ins}
      highlightOnHover
    >
      {data?.data.check_ins.map((item) => (
        <Table.Tr 
        className={classes.tr} 
        key={item.id} 
        onClick={() => 
        VisitModal.VisitSummary(dayjs(item.check_in_time).format("YYYY-MM-DD"), item.user.id, item.id)}
        >
          <Table.Td c="dimmed">
            {dayjs(item.check_in_time).format("MM-DD-YYYY LT")}
          </Table.Td>
          <Table.Td>{item.reason_for_visit}</Table.Td>
          <Table.Td>
            {item.items_dispensed.length > 0
              ? item.items_dispensed.map((dispensed) => dispensed.name).join(", ")
              : "--"}
          </Table.Td>
        </Table.Tr>
      ))}
    </AppTable>
  );
}
