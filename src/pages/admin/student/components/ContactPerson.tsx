import { Box, Paper, Stack, Text } from "@mantine/core";

import { useStudentDetail } from "@/hooks/students/useStudentDetail";

export default function ContactPerson() {
	const { data } = useStudentDetail();

	return (
		<Paper p="lg" radius="lg" withBorder>
			<Stack>
				<Text fw={600} size="sm" tt="uppercase" c="primary">
					Contact Person
				</Text>
				<Box>
					<Text fw={500}>{data?.data.contact_person.name}</Text>
					<Text c="dimmed" size="xs">
						{data?.data.contact_person.number}
					</Text>
				</Box>
			</Stack>
		</Paper>
	);
}
