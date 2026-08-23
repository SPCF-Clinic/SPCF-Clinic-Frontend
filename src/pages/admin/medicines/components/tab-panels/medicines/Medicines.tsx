import { Box, Button, Group, Stack } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

import { SearchFilter } from "@/components/SearchFilter";
import { useItems } from "@/hooks/items/useItems";
import MedicineTable from "./MedicineTable";

export default function Medicines() {
	const { isFetching } = useItems({ type: "Medicine" });

	return (
		<Box>
			<Stack>
				<Group justify="space-between">
					<SearchFilter
						queryKey="search"
						textInputProps={{ loading: isFetching }}
					/>
					<Button size="md" fz="sm" leftSection={<IconPlus size={20} />}>
						Add Medicine
					</Button>
				</Group>
				<MedicineTable />
			</Stack>
		</Box>
	);
}
