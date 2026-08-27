import { Card, Tabs } from "@mantine/core";
import { parseAsStringLiteral, useQueryState } from "nuqs";

import classes from "@/styles/Tabs.module.css";
import History from "./tab-panels/History";
import MedicineSupply from "./tab-panels/MedicineSupply";

const TAB_VALUES = ["medicines", "supplies", "history"] as const;
type TabValue = (typeof TAB_VALUES)[number];

export default function MedicinesTabs() {
	const [tab, setTab] = useQueryState(
		"t",
		parseAsStringLiteral(TAB_VALUES).withDefault("medicines"),
	);

	return (
		<Tabs
			variant="outline"
			value={tab}
			onChange={(value) => setTab(value as TabValue)}
			classNames={{ tab: classes.tab, list: classes.list }}
		>
			<Tabs.List>
				<Tabs.Tab value="medicines" tt="uppercase" fw={600}>
					Medicines
				</Tabs.Tab>
				<Tabs.Tab value="supplies" tt="uppercase" fw={600}>
					Supplies
				</Tabs.Tab>
				<Tabs.Tab value="history" tt="uppercase" fw={600}>
					History
				</Tabs.Tab>
			</Tabs.List>

			<Card>
				<Tabs.Panel value="medicines">
					<MedicineSupply type="Medicine" />
				</Tabs.Panel>
				<Tabs.Panel value="supplies">
					<MedicineSupply type="Supply" />
				</Tabs.Panel>
				<Tabs.Panel value="history">
					<History />
				</Tabs.Panel>
			</Card>
		</Tabs>
	);
}
