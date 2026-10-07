import { Center, Table } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ActionMenu from "@/components/ActionMenu";
import { AppTable, type ColumnDef } from "@/components/AppTable";
import QueryError from "@/components/QueryError";
import type { StudentSortKey } from "@/api/students";
import { useStudentSort } from "@/hooks/students/useStudentSort";
import { useStudents } from "@/hooks/students/useStudents";
import SexIcon from "./SexIcon";
import StatusBadge from "./StatusBadge";

const COLUMNS: ColumnDef<StudentSortKey>[] = [
  { title: "Student Number", w: "15%", sortKey: "student_id" },
  { title: "Name", sortKey: "name" },
  { title: "Grade Level/Year", w: "15%", sortKey: "year_level" },
  { title: "Age", w: "10%", sortKey: "age" },
  { title: "Sex", w: "5%", sortKey: "sex" },
  { title: "Status", w: "15%", sortKey: "status" },
  { id: "actions", w: 48 },
];

export default function StudentTable() {
  const navigate = useNavigate();

  const { data, isPending, error, refetch, isFetching } = useStudents();
  const { sort, setSort } = useStudentSort();

  const sortKey = sort ? `${sort.by}:${sort.order}` : "";
  const [settledSortKey, setSettledSortKey] = useState(sortKey);
  if (!isFetching && settledSortKey !== sortKey) {
    setSettledSortKey(sortKey);
  }
  const isSortLoading = isFetching && sortKey !== settledSortKey;

  if (error) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  return (
    <AppTable
      columns={COLUMNS}
      isPending={isPending}
      data={data?.data.students}
      highlightOnHover
      style={{
        opacity: isSortLoading ? 0.45 : 1,
        transition: "opacity 150ms",
      }}
      sort={{
        key: sort?.by ?? null,
        order: sort?.order ?? null,
        onSortChange: setSort,
      }}
    >
      {data?.data.students.map((student) => (
        <Table.Tr
          style={{ cursor: "pointer" }}
          key={student.id}
          onClick={() => {
            const selection = window.getSelection()?.toString();
            if (selection && selection.length > 0) {
              return;
            }

            navigate(`/admin/students/${student.id}`);
          }}
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
          <Table.Td>
            <Center>
              <ActionMenu
                items={[]}
                actionIconProps={{ onClick: (e) => e.stopPropagation() }}
              />
            </Center>
          </Table.Td>
        </Table.Tr>
      ))}
    </AppTable>
  );
}
