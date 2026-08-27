import { Group, Stack } from "@mantine/core";

import { PrintButton } from "@/components/PrintButton";
import { SearchFilter } from "@/components/SearchFilter";
import { useCheckIns } from "@/hooks/check-ins/useCheckIns";
import VisitHistoryTable from "./VisitHitoryTable";

export default function VisitHistory() {
	const { isFetching } = useCheckIns();

	return (
		<Stack>
			<Group justify="space-between">
				<SearchFilter textInputProps={{ loading: isFetching }} />
				<PrintButton />
			</Group>
			<VisitHistoryTable />
		</Stack>
	);
}
