import { AppShell, Box } from "@mantine/core";

import DashboardAside from "@/pages/admin/dashboard/components/dashboard-aside/DashboardAside";
import { DashboardAsideProvider } from "@/providers/DashboardAsideProvider";
import { ASIDE_OPENED_WIDTH } from "../WebLayout";
import classes from "./Aside.module.css";

interface AsideProps {
	show?: boolean;
}

export default function Aside({ show = false }: AsideProps) {
	return (
		<AppShell.Aside
			p="md"
			className={classes.aside}
			data-visible={show}
			style={{
				"--aside-opened-width": `${ASIDE_OPENED_WIDTH}px`,
			}}
		>
			<DashboardAsideProvider active={show}>
				<Box className={classes.content}>
					<DashboardAside />
				</Box>
			</DashboardAsideProvider>
		</AppShell.Aside>
	);
}
