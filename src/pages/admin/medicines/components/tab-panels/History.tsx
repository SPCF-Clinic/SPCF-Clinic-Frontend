import { Stack } from "@mantine/core";

import { SearchFilter } from "@/components/SearchFilter";
import { useDispensedItems } from "@/hooks/items/useDispensedItems";
import HistoryTable from "./HistoryTable";

export default function History() {
	const { isFetching } = useDispensedItems();

	return (
		<Stack>
			<SearchFilter textInputProps={{ loading: isFetching }} />
			<HistoryTable />
		</Stack>
	);
}
