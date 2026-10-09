import { Center, Table } from "@mantine/core";

import ActionMenu from "@/components/ActionMenu";
import { AppTable, type ColumnDef } from "@/components/AppTable";
import QueryError from "@/components/QueryError";
import { useIsSuperAdmin } from "@/hooks/useIsSuperAdmin";
import AccountModal from "@/pages/admin/modals/AccountModal";
import { useUsers } from "@/hooks/users/useUsers";

const BASE_COLUMNS: ColumnDef[] = [
  { title: "User" },
  { title: "Contact No.", w: "25%" },
  { title: "Access", w: "15%" },
];

export default function AccountsTable() {
  const { data, isPending, error, refetch } = useUsers();
  const isSuperAdmin = useIsSuperAdmin();

  const columns: ColumnDef[] = isSuperAdmin
    ? [...BASE_COLUMNS, { id: "actions", w: 48 }]
    : BASE_COLUMNS;

  if (error) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  return (
    <AppTable columns={columns} isPending={isPending} data={data?.data.users}>
      {data?.data.users.map((user) => (
        <Table.Tr key={user.id}>
          <Table.Td>{user.name ?? user.username}</Table.Td>
          <Table.Td>{user.contact_number}</Table.Td>
          <Table.Td>{user.access}</Table.Td>
          {isSuperAdmin && (
            <Table.Td>
              <Center>
                <ActionMenu
                  items={[
                    {
                      children: "Change password",
                      onClick: (e) => {
                        e.stopPropagation();
                        AccountModal.ChangePassword(user);
                      },
                    },
                  ]}
                />
              </Center>
            </Table.Td>
          )}
        </Table.Tr>
      ))}
    </AppTable>
  );
}
