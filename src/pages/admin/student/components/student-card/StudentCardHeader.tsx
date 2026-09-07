import { Badge, Box, Group, type MenuItemProps, Text } from "@mantine/core";

import ActionMenu from "@/components/ActionMenu";
import StatusModal from "@/components/modals/StatusModal";

const MENU_ITEMS: MenuItemProps[] = [
	{
		children: "Edit information",
	},
	{
		children: "Change password",
	},
	{
		children: "Archive",
		c: "red",
	},
];

interface StudentCardHeaderProps {
	fullName: string;
	studentData: any;
}

export default function StudentCardHeader({
	fullName,
	studentData,
}: StudentCardHeaderProps) {


	return (
		<Group justify="space-between">
			<Box>
				<Text fw={600} size="xl">
					{fullName}
				</Text>
				<Text size="sm" c="gray.7">
					{studentData.username}
				</Text>
			</Box>
			<Group>
				<Badge
					size="xl"
					variant="outline"
					color="gray.7"
					bg="gray.2"
					fw={400}
					fz="sm"
					tt="none"
					onClick={()=>{StatusModal.StudentInClinic(studentData)}}
				>
					Not In Clinic
				</Badge>
				<ActionMenu items={MENU_ITEMS} />
			</Group>
		</Group>
	);
}
