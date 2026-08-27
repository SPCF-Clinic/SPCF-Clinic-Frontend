import { Stack } from "@mantine/core";

import { SearchFilter } from "@/components/SearchFilter";
import { useUsers } from "@/hooks/users/useUsers";
import AccountsTable from "./AccountsTable";

export default function AccountManager() {
	const { isFetching } = useUsers();

	return (
		<Stack>
			<SearchFilter textInputProps={{ loading: isFetching }} />
			<AccountsTable />
		</Stack>
	);
}
