import { Card, Stack, Text } from "@mantine/core";

import RecordsTabs from "./components/RecordsTabs";

export default function Records() {
	return (
		<Card flex={1} p="lg" radius="lg" withBorder>
			<Stack className="printable-area">
				<Text component="h2" fw="bold" size="xl">
					Records
				</Text>
				<Card.Section>
					<RecordsTabs />
				</Card.Section>
			</Stack>
		</Card>
	);
}
