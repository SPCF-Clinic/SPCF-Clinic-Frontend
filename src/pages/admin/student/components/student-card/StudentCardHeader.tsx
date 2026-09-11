import { Badge, Box, Group, type MenuItemProps, Text, ActionIcon } from "@mantine/core";
import { IconPill } from "@tabler/icons-react";

import ActionMenu from "@/components/ActionMenu";
import StatusModal from "@/pages/admin/modals/StatusModal";
import MedicineModal from "@/pages/admin/modals/MedicineModal";

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

	console.log(studentData)

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
				{studentData.check_in.status === "Not In Clinic" ? <Badge
					size="lg"
					variant="outline"
					color="gray.7"
					bg="gray.2"
					fw={400}
					fz="sm"
					tt="none"
					onClick={() => { StatusModal.StudentInClinic(studentData) }}
				>
					Not In Clinic
				</Badge> : <>
					<Badge
						size="lg"
						variant="outline"
						color="green.7"
						bg="green.2"
						fw={400}
						fz="sm"
						tt="none"
					>
						{studentData.check_in.status}
					</Badge>
					<Badge
						size="lg"
						variant="outline"
						color="blue.7"
						bg="blue.2"
						fw={400}
						fz="sm"
						tt="none"
					>
						{studentData.check_in.bed}
					</Badge>
					<ActionIcon
						variant="light"
						color="blue"
						size="md"
						radius="md"
						onClick={() => {
							MedicineModal.Give(studentData, "Medicine")
						}}
					>
						<IconPill size={20} />
					</ActionIcon>
				</>}

				<ActionMenu items={MENU_ITEMS} />
			</Group>
		</Group>
	);
}
