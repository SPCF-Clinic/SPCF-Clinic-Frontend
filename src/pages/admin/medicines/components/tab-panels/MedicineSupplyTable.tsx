import { Center, Loader, Table } from "@mantine/core";

import type { GetItemsFilters } from "@/api/items";
import ActionMenu, { type ActionMenuItem } from "@/components/ActionMenu";
import { AppTable, type ColumnDef } from "@/components/AppTable";
import QueryError from "@/components/QueryError";
import { toast } from "@/components/toast";
import { useDeleteItemMutation } from "@/hooks/items/useDeleteItemMutation";
import { useItems } from "@/hooks/items/useItems";
import { useAuthStore } from "@/stores/useAuthStore";
import type { ItemIndex, ItemType } from "@/types/items";
import { isApiError } from "@/utils/api";
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

	const deleteItemMutation = useDeleteItemMutation(props.type);

	const handleDeleteItem = (itemId: number) =>
		deleteItemMutation.mutate(itemId, {
			onSuccess: () =>
				toast.success({ message: `${props.type} deleted successfully` }),
			onError: (error) => {
				const message = `Failed to delete ${props.type}`;

				if (isApiError(error)) {
					return toast.error({
						message: error.response?.data.message ?? message,
					});
				}
				toast.error({ message });
			},
		});

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
										? ([
												{
													children: "Edit",
													onClick: () => onEdit(item),
													fw: 500,
												},
												{
													children: "Delete",
													rightSection: deleteItemMutation.isPending ? (
														<Loader size={16} color="red" />
													) : undefined,
													onClick: () => handleDeleteItem(item.id),
													c: "red",
													fw: 500,
													closeMenuOnClick: false,
													disabled: deleteItemMutation.isPending,
												},
											] as ActionMenuItem[])
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
