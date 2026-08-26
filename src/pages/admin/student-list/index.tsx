import { Group, Paper, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

import { PrintButton } from "@/components/PrintButton";
import { SearchFilter } from "@/components/SearchFilter";
import { studentQueries } from "@/query/students";
import StudentTable from "./components/student-table/StudentTable";

export default function StudentList() {
	const [student_id] = useQueryState("student_id", { defaultValue: "" });
	const { data, isFetching } = useQuery(studentQueries.list({ student_id }));

	return (
		<Paper flex={1} p="lg" radius="lg" withBorder>
			<Stack className="printable-area">
				<Text component="h2" fw="bold" size="xl">
					List of Students {data ? `(${data.data.pagination.total})` : ""}
				</Text>
				<Group justify="space-between">
					<SearchFilter
						numeric
						queryKey="student_id"
						textInputProps={{
							placeholder: "Search Student Number",
							loading: isFetching,
							inputMode: "numeric",
						}}
					/>
					<PrintButton className="no-print" />
				</Group>
				<StudentTable />
			</Stack>
		</Paper>
	);
}
