import { Box, Flex, Text } from "@mantine/core";

import { dayjs } from "@/services/dayjs";

interface ActivityProps {
	action: string;
	date: string;
	highlightAction?: string;
}

export default function Activity({
	action,
	date,
	highlightAction,
}: ActivityProps) {
	const highlightIndex = highlightAction ? action.indexOf(highlightAction) : -1;

	const highlight = highlightIndex !== -1 ? highlightAction : undefined;

	return (
		<Flex gap="sm">
			<Box bdrs={2} bg="primary" w={4} />
			<Box py="xs">
				<Text fw={500}>
					{highlight ? (
						<>
							{action.slice(0, highlightIndex)}
							<Text component="span" c="primary" fw={600}>
								{highlight}
							</Text>
							{action.slice(highlightIndex + highlight.length)}
						</>
					) : (
						action
					)}
				</Text>
				<Text lh={1} c="dimmed">
					{dayjs(date).format("MM-DD-YYYY LT")}
				</Text>
			</Box>
		</Flex>
	);
}
