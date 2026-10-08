import {
  Badge,
  Box,
  Group,
  type MenuItemProps,
  Text,
  ActionIcon,
} from "@mantine/core";
import { IconPill } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import ActionMenu from "@/components/ActionMenu";
import { useIsSuperAdmin } from "@/hooks/useIsSuperAdmin";
import StatusModal from "@/pages/admin/modals/StatusModal";
import MedicineModal from "@/pages/admin/modals/MedicineModal";
import EditStudentModal from "@/pages/admin/modals/EditStudentModal";
import { studentQueries } from "@/query/students";

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
  const queryClient = useQueryClient();
  const isSuperAdmin = useIsSuperAdmin();

  const isArchived = studentData?.status === "Archived";

  const { mutate: archiveStudent } = useMutation({
    ...studentQueries.archive(studentData.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentQueries.lists() });
      queryClient.invalidateQueries({
        queryKey: studentQueries.detail(studentData.id).queryKey,
      });
    },
  });

  const handleToggleArchive = () => {
    const nextStatus = isArchived ? "UNARCHIVE" : "ARCHIVE";

    EditStudentModal.Archive(studentData, () => {
      archiveStudent({ status: nextStatus });
    });
  };

  const menuItems: MenuItemProps[] = [
    { children: "Edit information", onClick: onEdit },
    {
      children: "Change password",
      onClick: () => EditStudentModal.ChangePassword(studentData),
    },
    {
      children: studentData?.status === "Archived" ? "Unarchive" : "Archive",
      c: "red",
      onClick: () => handleToggleArchive(),
    },
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
        {studentData?.check_in?.status === "Not In Clinic" && !isArchived ? (
          <Badge
            size="lg"
            variant="outline"
            color="gray.7"
            bg="gray.2"
            fw={400}
            fz="sm"
            tt="none"
            style={{ cursor: "pointer" }}
            onClick={() => {
              StatusModal.StudentCheckIn(studentData);
            }}
          >
            Not In Clinic
          </Badge>
        ) : isArchived ? (
          <Badge
            size="lg"
            variant="outline"
            color="red"
            fw={400}
            fz="sm"
            tt="none"
            style={{ cursor: "pointer" }}
            onClick={() => {
              StatusModal.StudentCheckIn(studentData);
            }}
          >
            ARCHIVED
          </Badge>
        ) : (
          <>
            <Badge
              size="lg"
              variant="outline"
              color="green.7"
              bg="green.2"
              fw={400}
              fz="sm"
              tt="none"
            >
              {studentData?.check_in?.status}
            </Badge>
            {studentData?.check_in?.bed ? (
              <Badge
                size="lg"
                variant="outline"
                color="blue.7"
                bg="blue.2"
                fw={400}
                fz="sm"
                tt="none"
              >
                {studentData.check_in.bed?.bed_number}
              </Badge>
            ) : (
              <Badge
                size="lg"
                variant="outline"
                color="blue"
                bg="blue"
                c="white"
                fw={400}
                fz="sm"
                tt="none"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  StatusModal.AssignBed(studentData);
                }}
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
                MedicineModal.Give(studentData, "Medicine");
              }}
            >
              <IconPill size={20} />
            </ActionIcon>
          </>
        )}

        {isSuperAdmin && <ActionMenu items={menuItems} />}
      </Group>
    </Group>
  );
}
