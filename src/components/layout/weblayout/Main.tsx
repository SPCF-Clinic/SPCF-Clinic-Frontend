import { Outlet } from "react-router-dom";
import { AppShell, Box } from "@mantine/core";

export default function Main() {
  return (
    <AppShell.Main display="flex" style={{ flexDirection: "column" }}>
      <Box bg="#edf0f6" bdrs="lg" p="md" flex={1} mt="md" mb="lg">
        <Outlet />
      </Box>
    </AppShell.Main>
  );
}
