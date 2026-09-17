import { Badge, Box, Group, type MenuItemProps, Text, ActionIcon } from "@mantine/core";
import { IconPill } from "@tabler/icons-react";

import ActionMenu from "@/components/ActionMenu";
import StatusModal from "@/pages/admin/modals/StatusModal";
import MedicineModal from "@/pages/admin/modals/MedicineModal";

interface StudentCardHeaderProps {
	fullName: string;
	studentData: any;
	onEdit: () => void;
}

export default function StudentCardHeader({
	fullName,
	studentData,
	onEdit,
}: StudentCardHeaderProps) {
	const menuItems: MenuItemProps[] = [
		{ children: "Edit information", onClick: onEdit },
		{ children: "Change password" },
		{ children: "Archive", c: "red" },
	];

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
					onClick={() => { StatusModal.StudentCheckIn(studentData) }}
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
					{studentData.check_in?.bed ? (
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
					) : (
						<Badge
							size="lg"
							variant="outline"
							color="blue"
							bg="blue"
							c={"white"}
							fw={400}
							fz="sm"
							tt="none"
							style={{ cursor: "pointer" }}
							onClick={() => { StatusModal.AssignBed(studentData) }}
						>
							Assign
						</Badge>
					)}
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

				<ActionMenu items={menuItems} />
			</Group>
		</Group>
	);
}
