import { Group, Paper, Stack, Text } from "@mantine/core";
import { useRef } from "react";

import { PrintButton } from "@/components/PrintButton";
import { SearchFilter } from "@/components/SearchFilter";
import { useStudents } from "@/hooks/students/useStudents";
import StudentTable from "./components/student-table/StudentTable";

export default function StudentList() {
	const { data, isFetching } = useStudents();

	const contentRef = useRef<HTMLDivElement>(null);

	return (
		<Paper flex={1} p="lg" radius="lg" withBorder>
			<Stack ref={contentRef}>
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
					<PrintButton printOptions={{ contentRef }} />
				</Group>
				<StudentTable />
			</Stack>
		</Paper>
	);
}
