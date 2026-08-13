import { AppShell } from "@mantine/core";

import DashboardAside from "@/pages/admin/dashboard/components/dashboard-aside/DashboardAside";

interface AsideProps {
  show?: boolean;
}

export default function Aside({ show }: AsideProps) {
  return (
    <AppShell.Aside
      p="md"
      style={{
        transitionProperty: "width, opacity",
        transitionTimingFunction: "var(--mantine-layout-transition-timing)",
        transitionDuration: "var(--mantine-layout-transition-duration)",
        opacity: show ? 1 : 0,
        pointerEvents: show ? "auto" : "none",
      }}
    >
      <DashboardAside />
    </AppShell.Aside>
  );
}
