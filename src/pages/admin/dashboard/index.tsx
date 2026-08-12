import { Stack } from "@mantine/core";

import DashboardCards from "./components/DashboardCards";
import DashboardBeds from "./components/dashboard-beds/DashboardBeds";

export default function Dashboard() {
  return (
    <Stack>
      <DashboardCards />
      <DashboardBeds />
    </Stack>
  );
}
