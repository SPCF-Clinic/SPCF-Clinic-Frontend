import { Stack } from "@mantine/core";

import { useDashboardRealtime } from "@/hooks/dashboard/useDashboardRealtime";
import { useTimerRealtime } from "@/hooks/timers/useTimerRealtime";
import DashboardCards from "./components/DashboardCards";
import DashboardBeds from "./components/dashboard-beds/DashboardBeds";
import DashboardInClinic from "./components/DashboardInClinic";

export default function Dashboard() {
  useDashboardRealtime();
  useTimerRealtime();

  return (
    <Stack>
      <DashboardCards />
      <DashboardBeds />
      <DashboardInClinic />
    </Stack>
  );
}
