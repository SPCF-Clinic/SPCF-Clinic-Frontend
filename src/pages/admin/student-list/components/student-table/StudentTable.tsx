import { Center, Table } from "@mantine/core";
import { useState } from "react";

import {
  AppTable,
  type ColumnDef,
  type TableSort,
} from "@/components/AppTable";
import QueryError from "@/components/QueryError";
import SexIcon from "@/components/SexIcon";
import { useIsSuperAdmin } from "@/hooks/useIsSuperAdmin";
import type { StudentSortKey } from "@/api/students";
import type { StudentIndex } from "@/types/students";
import { preventNavigationOnHighlight } from "@/utils/preventNavigationOnHighlight";
import StatusBadge from "./StatusBadge";
import StudentActionMenu from "./StudentActionMenu";

const BASE_COLUMNS: ColumnDef<StudentSortKey>[] = [
  { title: "Student Number", w: "15%", sortKey: "student_id" },
  { title: "Name", sortKey: "name" },
  { title: "Grade Level/Year", w: "15%", sortKey: "year_level" },
  { title: "Age", w: "10%", sortKey: "age" },
  { title: "Sex", w: "5%", sortKey: "sex" },
  { title: "Status", w: "20%", sortKey: "status" },
];

const ACTIONS_COLUMN: ColumnDef<StudentSortKey> = { id: "actions", w: 48 };

interface StudentTableProps {
  students?: StudentIndex[];
  isPending?: boolean;
  isFetching?: boolean;
  error?: unknown;
  onRetry?: () => void;
  /** The current sort and its change handler. Omit it for the print
   *  snapshot: headers then render statically and rows lose their
   *  interactive affordances. */
  sort?: TableSort<StudentSortKey>;
  onRowClick?: (student: StudentIndex) => void;
  /** Shows the per-row action menu to super admins. Screen only. */
  showActions?: boolean;
}

export default function StudentTable({
  students,
  isPending,
  isFetching,
  error,
  onRetry,
  sort,
  onRowClick,
  showActions = false,
}: StudentTableProps) {
  const isSuperAdmin = useIsSuperAdmin();

  const sortKey = sort ? `${sort.key}:${sort.order}` : "";
  const [settledSortKey, setSettledSortKey] = useState(sortKey);
  if (!isFetching && settledSortKey !== sortKey) {
    setSettledSortKey(sortKey);
  }
  const isSortLoading = Boolean(isFetching) && sortKey !== settledSortKey;

  const columns =
    showActions && isSuperAdmin
      ? [...BASE_COLUMNS, ACTIONS_COLUMN]
      : BASE_COLUMNS;

  if (error) {
    return <QueryError error={error} onRetry={onRetry} />;
  }

  return (
    <AppTable
      columns={columns}
      isPending={isPending}
      data={students}
      highlightOnHover={onRowClick !== undefined}
      style={{
        opacity: isSortLoading ? 0.45 : 1,
        transition: "opacity 150ms",
      }}
      sort={sort}
    >
      {students?.map((student) => (
        <Table.Tr
          style={onRowClick ? { cursor: "pointer" } : undefined}
          key={student.id}
          onClick={
            onRowClick
              ? preventNavigationOnHighlight(() => onRowClick(student))
              : undefined
          }
        >
          <Table.Td fw={600}>{student.username}</Table.Td>
          <Table.Td>{student.name}</Table.Td>
          <Table.Td>
            {student.grade_level ?? `${student.year_level} - ${student.course}`}
          </Table.Td>
          <Table.Td>{student.age}</Table.Td>
          <Table.Td>
            <SexIcon sex={student.sex} />
          </Table.Td>
          <Table.Td>
            <StatusBadge status={student.status} />
          </Table.Td>
          {showActions && isSuperAdmin && (
            <Table.Td>
              <Center>
                <StudentActionMenu student={student} />
              </Center>
            </Table.Td>
          )}
        </Table.Tr>
      ))}
    </AppTable>
  );
}
