import { Card, Tabs } from "@mantine/core";
import { parseAsStringLiteral, useQueryState } from "nuqs";

import classes from "@/styles/Tabs.module.css";
import VisitHistory from "./tab-panels/visit-history/VisitHistory";

const TAB_VALUES = ["visit", "activity"] as const;
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
			classNames={{ tab: classes.tab }}
		>
			<Tabs.List
				style={{
					"--tab-border-color": "var(--mantine-color-primary-outline)",
				}}
			>
				<Tabs.Tab ms="xl" value="visit" tt="uppercase" fw={600}>
					Visit History
				</Tabs.Tab>
				<Tabs.Tab value="activity" tt="uppercase" fw={600}>
					Activity Log
				</Tabs.Tab>
			</Tabs.List>

			<Card>
				<Tabs.Panel value="visit">
					<VisitHistory />
				</Tabs.Panel>
				<Tabs.Panel value="activity">Activity</Tabs.Panel>
			</Card>
		</Tabs>
	);
}
