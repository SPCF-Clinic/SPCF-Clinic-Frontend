import { Center, Table } from "@mantine/core";

import type { GetItemsFilters } from "@/api/items";
import ActionMenu from "@/components/ActionMenu";
import { AppTable, type ColumnDef } from "@/components/AppTable";
import QueryError from "@/components/QueryError";
import { useItems } from "@/hooks/items/useItems";
import { useAuthStore } from "@/stores/useAuthStore";
import type { ItemIndex, ItemType } from "@/types/items";
import { getStockStatus } from "@/utils/items/getStockStatus";
import StockBadge from "../StockBadge";

const COLUMNS: ColumnDef[] = [
	{ title: "Name" },
	{ title: "Category" },
	{ title: "Unit" },
	{ title: "Dispensed" },
	{ title: "Stock" },
	{ title: "Status" },
	{ id: "actions", w: 48 },
];

interface MedicineSupplyTableProps<T extends ItemType>
	extends GetItemsFilters<T> {
	onEdit: (item: ItemIndex) => void;
}

export default function MedicineSupplyTable<T extends ItemType>({
	onEdit,
	...props
}: MedicineSupplyTableProps<T>) {
	const { data, isPending, error, refetch } = useItems(props);
	const { user } = useAuthStore();
	const isSuperAdmin = user?.role === "Super Admin";

	if (error) {
		return <QueryError error={error} onRetry={refetch} />;
	}

	return (
		<AppTable
			columns={COLUMNS}
			isPending={isPending}
			data={data?.data.items}
			skeletonRowHeight={57}
		>
			{data?.data.items.map((item) => (
				<Table.Tr key={item.id}>
					<Table.Td fw={600}>{item.name}</Table.Td>
					<Table.Td>{item.category}</Table.Td>
					<Table.Td>{item.unit}</Table.Td>
					<Table.Td>{item.dispensed}</Table.Td>
					<Table.Td>{item.quantity}</Table.Td>
					<Table.Td>
						<StockBadge status={getStockStatus(item)} />
					</Table.Td>
					<Table.Td>
						<Center>
							<ActionMenu
								items={[
									{
										children: `Dispense ${item.type}`,
										c: "primary",
										fw: 500,
									},
									...(isSuperAdmin
										? [
												{
													children: "Edit",
													onClick: () => onEdit(item),
													fw: 500,
												},
												{ children: "Delete", c: "red", fw: 500 },
											]
										: []),
								]}
							/>
						</Center>
					</Table.Td>
				</Table.Tr>
			))}
		</AppTable>
	);
}
