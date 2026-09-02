import { Card, Stack, Text } from "@mantine/core";

import ContentManagerTabs from "./components/ContentManagerTabs";

export default function ContentManager() {
	return (
		<Card flex={1} p="lg" radius="lg" withBorder>
			<Stack className="printable-area">
				<Text component="h2" fw="bold" size="xl">
					Content Manager
				</Text>
				<Card.Section>
					<ContentManagerTabs />
				</Card.Section>
			</Stack>
		</Card>
	);
}
