import { Box, Center, Grid, Loader, Stack } from "@mantine/core";

import { useStudentCheckIns } from "@/hooks/students/useStudentCheckIns";
import { useStudentDetail } from "@/hooks/students/useStudentDetail";
import Breadcrumbs from "./components/Breadcrumbs";
import ContactPerson from "./components/ContactPerson";
import Illnesses from "./components/Illnesses";
import StudentCard from "./components/student-card/StudentCard";
import VisitLog from "./components/visit-log/VisitLog";

export default function StudentProfile() {
	const studentQuery = useStudentDetail();
	const visitLogQuery = useStudentCheckIns();

	const isLoading = studentQuery.isLoading || visitLogQuery.isLoading;

	if (isLoading) {
		return (
			<Center flex={1}>
				<Loader />
			</Center>
		);
	}

	return (
		<Stack flex={1}>
			<Box ms={2}>
				<Breadcrumbs />
			</Box>
			<Grid gap="xs">
				<Grid.Col span={8.5}>
					<Stack>
						<StudentCard />
						<VisitLog />
					</Stack>
				</Grid.Col>
				<Grid.Col span={3.5}>
					<Stack>
						<ContactPerson />
						<Illnesses />
					</Stack>
				</Grid.Col>
			</Grid>
		</Stack>
	);
}
