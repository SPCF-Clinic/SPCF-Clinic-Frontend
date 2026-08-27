import { Button, Group, Stack } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

import { SearchFilter } from "@/components/SearchFilter";
import { useItems } from "@/hooks/items/useItems";
import { useAuthStore } from "@/stores/useAuthStore";
import type { ItemType } from "@/types/items";
import { SEARCH_KEYS } from "../../searchKeys";
import MedicineSupplyTable from "./MedicineSupplyTable";

interface MedicineSupplyProps {
	type: ItemType;
}

export default function MedicineSupply({ type }: MedicineSupplyProps) {
	const { isFetching } = useItems({ type });
	const searchKey = SEARCH_KEYS[type];

	const role = useAuthStore((state) => state.user)?.role;
	const isSuperAdmin = role === "Super Admin";

	return (
		<Stack>
			<Group justify="space-between">
				<SearchFilter
					queryKey={searchKey}
					textInputProps={{ loading: isFetching }}
				/>

				{isSuperAdmin && (
					<Button size="md" fz="sm" leftSection={<IconPlus size={20} />}>
						Add {type}
					</Button>
				)}
			</Group>
			<MedicineSupplyTable type={type} />
		</Stack>
	);
}
