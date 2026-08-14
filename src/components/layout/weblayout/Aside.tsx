import { AppShell, Box } from "@mantine/core";

import DashboardAside from "@/pages/admin/dashboard/components/dashboard-aside/DashboardAside";
import { ASIDE_OPENED_WIDTH } from "../WebLayout";
import classes from "./Aside.module.css";

interface AsideProps {
  show?: boolean;
}

export default function Aside({ show }: AsideProps) {
  return (
    <AppShell.Aside
      p="md"
      className={classes.aside}
      data-visible={show}
      style={{
        "--aside-opened-width": `${ASIDE_OPENED_WIDTH}px`,
      }}
    >
      <Box className={classes.content}>
        <DashboardAside />
      </Box>
    </AppShell.Aside>
  );
}
