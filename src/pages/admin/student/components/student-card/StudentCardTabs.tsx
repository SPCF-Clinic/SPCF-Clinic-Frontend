import { Tabs } from "@mantine/core";
import { parseAsStringLiteral, useQueryState } from "nuqs";

import classes from "@/styles/Tabs.module.css";
import MedicalHistory from "./tab-panels/MedicalHistory";
import PersonalInformation from "./tab-panels/PersonalInformation";

const TAB_VALUES = ["personal", "medical"] as const;
type TabValue = (typeof TAB_VALUES)[number];

export default function StudentCardTabs() {
	const [tab, setTab] = useQueryState(
		"t",
		parseAsStringLiteral(TAB_VALUES).withDefault("personal"),
	);

	return (
		<Tabs
			variant="outline"
			value={tab}
			onChange={(value) => setTab(value as TabValue)}
			classNames={{ tab: classes.tab, list: classes.list }}
		>
			<Tabs.List>
				<Tabs.Tab value="personal" tt="uppercase" fw={600}>
					Personal Information
				</Tabs.Tab>
				<Tabs.Tab value="medical" tt="uppercase" fw={600}>
					Medical & Vaccination History
				</Tabs.Tab>
			</Tabs.List>

			<Tabs.Panel value="personal">
				<PersonalInformation />
			</Tabs.Panel>
			<Tabs.Panel value="medical">
				<MedicalHistory />
			</Tabs.Panel>
		</Tabs>
	);
}
