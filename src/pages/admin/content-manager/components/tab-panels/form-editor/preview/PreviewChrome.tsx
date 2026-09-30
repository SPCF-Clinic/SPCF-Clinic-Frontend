import { Button, Stack, Stepper, Text } from "@mantine/core";

import type { FieldType } from "@/api/fields";
import Footer from "@/pages/student/components/Footer";

const STEP_INDEX = {
	Personal: 1,
	Medical: 2,
} satisfies Record<FieldType, number>;

const STEP_COUNT = 5;

interface PreviewChromeProps {
	type: FieldType;
	children: React.ReactNode;
}

export default function PreviewChrome({ type, children }: PreviewChromeProps) {
	const active = STEP_INDEX[type];

	const stepContent = (
		<>
			<Text fz={12} fs="italic" c="dimmed" mt={2} mb="xs">
				Step {active} of {STEP_COUNT}
			</Text>

			{children}
		</>
	);

	return (
		<>
			<Stack>
				<Text mx={4} fz={10} fw={400}>
					HEALTH ASSESSMENT FORM
				</Text>

				<Stepper
					active={active}
					icon={<></>}
					completedIcon={<></>}
					progressIcon={<></>}
					styles={{
						stepIcon: { display: "none" },
						stepBody: { display: "none" },
						separator: {
							marginLeft: 4,
							marginRight: 4,
							height: 4,
							borderRadius: 9999,
							flex: 1,
						},
					}}
				>
					<Stepper.Step />

					<Stepper.Step>
						{active === STEP_INDEX.Personal && stepContent}
					</Stepper.Step>

					<Stepper.Step>
						{active === STEP_INDEX.Medical && stepContent}
					</Stepper.Step>

					<Stepper.Step />
					<Stepper.Step />
					<Stepper.Step />
				</Stepper>

				<Button fullWidth bdrs={20} mb={10}>
					Continue
				</Button>
			</Stack>

			<Footer />
		</>
	);
}
