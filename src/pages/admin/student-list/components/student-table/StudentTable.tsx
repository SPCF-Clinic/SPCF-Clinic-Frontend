import { Center, Table } from "@mantine/core";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { useNavigate } from "react-router-dom";

import { AppTable, type ColumnDef } from "@/components/AppTable";
import QueryError from "@/components/QueryError";
import { studentQueries } from "@/query/students";
import RowActions from "./RowActions";
import SexIcon from "./SexIcon";

const COLUMNS: ColumnDef[] = [
  { title: "Student Number", w: "15%" },
  { title: "Name" },
  { title: "Grade Level/Year", w: "15%" },
  { title: "Age", w: "10%" },
  { title: "Sex", w: "5%" },
  { title: "Status", w: "10%" },
  { id: "actions", w: 48 },
];

export default function StudentTable() {
  const navigate = useNavigate();

  const [student_id] = useQueryState("student_id", { defaultValue: "" });

  const { data, isPending, error, refetch } = useQuery({
    ...studentQueries.list({ student_id }),
    placeholderData: keepPreviousData,
  });

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
          <Table.Td>{student.status || ""}</Table.Td>
          <Table.Td>
            <Center>
              <RowActions />
            </Center>
          </Table.Td>
        </Table.Tr>
      ))}
    </AppTable>
  );
}
