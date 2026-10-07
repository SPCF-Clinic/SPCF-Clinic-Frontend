import { Center, Table } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import ActionMenu from "@/components/ActionMenu";
import { AppTable, type ColumnDef } from "@/components/AppTable";
import QueryError from "@/components/QueryError";
import { useStudents } from "@/hooks/students/useStudents";
import SexIcon from "./SexIcon";
import StatusBadge from "./StatusBadge";

const COLUMNS: ColumnDef[] = [
  { title: "Student Number", w: "15%" },
  { title: "Name" },
  { title: "Grade Level/Year", w: "15%" },
  { title: "Age", w: "10%" },
  { title: "Sex", w: "5%" },
  { title: "Status", w: "15%" },
  { id: "actions", w: 48 },
];

export default function StudentTable() {
  const navigate = useNavigate();

  const { data, isPending, error, refetch } = useStudents();

  if (error) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  return (
    <AppTable
      columns={COLUMNS}
      isPending={isPending}
      data={data?.data.students}
      highlightOnHover
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
