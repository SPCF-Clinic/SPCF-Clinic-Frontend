import { Center, Table } from "@mantine/core";

import ActionMenu from "@/components/ActionMenu";
import { AppTable, type ColumnDef } from "@/components/AppTable";
import QueryError from "@/components/QueryError";
import { useUsers } from "@/hooks/users/useUsers";

const COLUMNS: ColumnDef[] = [
	{ title: "User" },
	{ title: "Contact No.", w: "15%" },
	{ title: "Email", w: "25%" },
	{ title: "Access", w: "10%" },
	{ id: "actions", w: 48 },
];

export default function AccountsTable() {
	const { data, isPending, error, refetch } = useUsers();

	if (error) {
		return <QueryError error={error} onRetry={refetch} />;
	}

	return (
		<AppTable columns={COLUMNS} isPending={isPending} data={data?.data}>
			{data?.data.map((user) => (
				<Table.Tr key={user.id}>
					<Table.Td>{user.name ?? user.username}</Table.Td>
					<Table.Td>{user.contact_number}</Table.Td>
					<Table.Td></Table.Td>
					<Table.Td>{user.access}</Table.Td>
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
