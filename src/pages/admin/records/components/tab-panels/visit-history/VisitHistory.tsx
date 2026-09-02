import { Group, Stack } from "@mantine/core";

import { PrintButton } from "@/components/PrintButton";
import { SearchFilter } from "@/components/SearchFilter";
import { useCheckIns } from "@/hooks/check-ins/useCheckIns";
import { usePrintContext } from "@/hooks/context/usePrintContext";
import VisitHistoryTable from "./VisitHitoryTable";

export default function VisitHistory() {
	const { isFetching } = useCheckIns();
	const { contentRef } = usePrintContext();

	return (
		<Stack>
			<Group justify="space-between">
				<SearchFilter textInputProps={{ loading: isFetching }} />
				<PrintButton printOptions={{ contentRef }} />
			</Group>
			<VisitHistoryTable />
		</Stack>
	);
}
