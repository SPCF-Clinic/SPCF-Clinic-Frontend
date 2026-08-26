import { AppShell, Stack } from "@mantine/core";

import { Outlet } from "react-router-dom";

export default function Main() {
	return (
		<AppShell.Main display="flex" style={{ flexDirection: "column" }}>
			<Stack bg="#edf0f6" bdrs="xl" p="md" flex={1} mb="lg">
				<Outlet />
			</Stack>
		</AppShell.Main>
	);
}
