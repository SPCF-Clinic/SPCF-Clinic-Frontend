import { Stack } from "@mantine/core";

import ActiveTimers from "./ActiveTimers";
import ActivityLogs from "./ActivityLogs";

export default function DashboardAside() {
	return (
		<Stack>
			<ActiveTimers />
			<ActivityLogs />
		</Stack>
	);
}
