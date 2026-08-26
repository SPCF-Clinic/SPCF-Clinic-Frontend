import { Card } from "@mantine/core";

import MedicinesTabs from "./components/MedicinesTabs";

export default function Medicines() {
	return (
		<Card flex={1} p="lg" radius="lg" withBorder>
			<Card.Section mt={2}>
				<MedicinesTabs />
			</Card.Section>
		</Card>
	);
}
