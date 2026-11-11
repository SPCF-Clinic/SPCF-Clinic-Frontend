import { Card, Tabs } from "@mantine/core";
import { parseAsStringLiteral, useQueryState } from "nuqs";

import classes from "@/styles/Tabs.module.css";
import ActivityLog from "./tab-panels/activity-log/ActivityLog";
import VisitHistory from "./tab-panels/visit-history/VisitHistory";
import Summary from "./tab-panels/summary/Summary"

const TAB_VALUES = ["visit", "activity", "summary"] as const;
type TabValue = (typeof TAB_VALUES)[number];

export default function RecordsTabs() {
	const [tab, setTab] = useQueryState(
		"t",
		parseAsStringLiteral(TAB_VALUES).withDefault("visit"),
	);

	return (
		<Tabs
			variant="outline"
			value={tab}
			onChange={(value) => setTab(value as TabValue)}
			classNames={{ tab: classes.tab, list: classes.list }}
		>
			<Tabs.List>
				<Tabs.Tab value="visit" tt="uppercase" fw={600}>
					Visit History
				</Tabs.Tab>
				<Tabs.Tab value="activity" tt="uppercase" fw={600}>
					Activity Log
				</Tabs.Tab>
				<Tabs.Tab value="summary" tt="uppercase" fw={600}>
					Summary
				</Tabs.Tab>
			</Tabs.List>

			<Card>
				<Tabs.Panel value="visit">
					<VisitHistory />
				</Tabs.Panel>
				<Tabs.Panel value="activity">
					<ActivityLog />
				</Tabs.Panel>
				<Tabs.Panel value="summary">
					<Summary/>
				</Tabs.Panel>
			</Card>
		</Tabs>
	);
}
