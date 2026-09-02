import { Table, Text } from "@mantine/core";

import { AppTable, type ColumnDef } from "@/components/AppTable";
import QueryError from "@/components/QueryError";
import { useDispensedItems } from "@/hooks/items/useDispensedItems";
import { dayjs } from "@/services/dayjs";

const COLUMNS: ColumnDef[] = [
	{ title: "Timestamp", miw: 180 },
	{ title: "Patient Name" },
	{ title: "Medicine Name" },
	{ title: "Unit" },
	{ title: "Quantity", w: 120 },
];

export default function HistoryTable() {
	const { data, isPending, error, refetch } = useDispensedItems();

	if (error) {
		return <QueryError error={error} onRetry={refetch} />;
	}

	return (
		<AppTable
			columns={COLUMNS}
			isPending={isPending}
			data={data?.data.dispensed_items}
		>
			{data?.data.dispensed_items.map((item) => (
				<Table.Tr key={item.id}>
					<Table.Td>
						<Text c="dimmed" size="sm">
							{dayjs(item.created_at).format("MM-DD-YYYY LT")}
						</Text>
					</Table.Td>
					<Table.Td>{item.dispensed_to.name}</Table.Td>
					<Table.Td>{item.item.name}</Table.Td>
					<Table.Td>{item.item.unit}</Table.Td>
					<Table.Td>{item.item.quantity}</Table.Td>
				</Table.Tr>
			))}
		</AppTable>
	);
}
