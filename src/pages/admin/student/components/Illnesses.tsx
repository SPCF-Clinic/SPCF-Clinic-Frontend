import { Paper, Stack, Text } from "@mantine/core";

import { useStudentDetail } from "@/hooks/students/useStudentDetail";

export default function Illnesses() {
	const { data } = useStudentDetail();

	const illnesses = data?.data.illnesses ?? [];

	if (illnesses.length === 0) {
		return null;
	}

	return (
		<Paper p="lg" radius="lg" withBorder>
			<Stack>
				<Text fw={600} size="sm" tt="uppercase" c="primary">
					Illnesses
				</Text>
				<Stack gap={0}>
					{illnesses.map((illness, i) => (
						<Text key={i} fw={500}>
							{illness}
						</Text>
					))}
				</Stack>
			</Stack>
		</Paper>
	);
}
