import { Accordion } from "@mantine/core";

import { useMedicalInfo } from "@/query/student-register";
import classes from "./FormEditor.module.css";
import MedicalPanel from "./MedicalPanel";
import PersonalInfoPanel from "./PersonalInfoPanel";

export default function FormEditor() {
	useMedicalInfo();

	return (
		<Accordion
			multiple
			variant="separated"
			styles={{
				item: {
					"--item-border-color": "#D3D3D3",
				},
			}}
			classNames={{ item: classes.item, label: classes.label }}
		>
			<Accordion.Item value="personal-info">
				<Accordion.Control>Personal Information</Accordion.Control>
				<Accordion.Panel>
					<PersonalInfoPanel />
				</Accordion.Panel>
			</Accordion.Item>

			<Accordion.Item value="medical-info">
				<Accordion.Control>Medical & Vaccination History</Accordion.Control>
				<Accordion.Panel>
					<MedicalPanel />
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	);
}
