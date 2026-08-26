import { Center, Table } from "@mantine/core";

import type { GetItemsFilters } from "@/api/items";
import ActionMenu from "@/components/ActionMenu";
import { AppTable, type ColumnDef } from "@/components/AppTable";
import QueryError from "@/components/QueryError";
import { useItems } from "@/hooks/items/useItems";
import type { ItemType } from "@/types/items";

const COLUMNS: ColumnDef[] = [
	{ title: "Name" },
	{ title: "Category" },
	{ title: "Unit" },
	{ title: "Dispensed" },
	{ title: "Stock" },
	{ title: "Status" },
	{ id: "actions", w: 48 },
];

export default function MedicineSupplyTable<T extends ItemType>(
	props: GetItemsFilters<T>,
) {
	const { data, isPending, error, refetch } = useItems(props);

	if (error) {
		return <QueryError error={error} onRetry={refetch} />;
	}

	return (
		<AppTable columns={COLUMNS} isPending={isPending} data={data?.data.items}>
			{data?.data.items.map((item) => (
				<Table.Tr key={item.id}>
					<Table.Td fw={600}>{item.name}</Table.Td>
					<Table.Td>{item.category}</Table.Td>
					<Table.Td>{item.unit}</Table.Td>
					<Table.Td></Table.Td>
					<Table.Td>{item.quantity}</Table.Td>
					<Table.Td></Table.Td>
					<Table.Td>
						<Center>
							<ActionMenu items={[]} />
						</Center>
					</Table.Td>
				</Table.Tr>
			))}
		</AppTable>
	);
}
