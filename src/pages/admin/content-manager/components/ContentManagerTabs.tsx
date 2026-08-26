import { Card, Tabs } from "@mantine/core";
import { parseAsStringLiteral, useQueryState } from "nuqs";

import classes from "@/styles/Tabs.module.css";
import AccountManager from "./tab-panels/account-manager/AccountManager";

const TAB_VALUES = ["account", "form"] as const;
type TabValue = (typeof TAB_VALUES)[number];

export default function ContentManagerTabs() {
	const [tab, setTab] = useQueryState(
		"t",
		parseAsStringLiteral(TAB_VALUES).withDefault("account"),
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
				<Tabs.Tab ms="xl" value="account" tt="uppercase" fw={600}>
					Account Manager
				</Tabs.Tab>
				<Tabs.Tab value="form" tt="uppercase" fw={600}>
					Form Editor
				</Tabs.Tab>
			</Tabs.List>

			<Card>
				<Tabs.Panel value="account">
					<AccountManager />
				</Tabs.Panel>
				<Tabs.Panel value="form">Form Editor</Tabs.Panel>
			</Card>
		</Tabs>
	);
}
