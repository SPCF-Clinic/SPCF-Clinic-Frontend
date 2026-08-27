import { Paper, Stack, Text } from "@mantine/core";

import { SearchFilter } from "@/components/SearchFilter";
import { useStudentCheckIns } from "@/hooks/students/useStudentCheckIns";
import VisitLogTable from "./VisitLogTable";

export default function VisitLog() {
	const { data, isFetching } = useStudentCheckIns();

	return (
		<Paper radius="lg" p="lg" withBorder>
			<Stack>
				<Text size="sm" fw={600} c="primary" tt="uppercase">
					Visit Log {data ? `(${data.data.pagination.total})` : ""}
				</Text>
				<SearchFilter textInputProps={{ loading: isFetching }} />
				<VisitLogTable />
			</Stack>
		</Paper>
	);
}
