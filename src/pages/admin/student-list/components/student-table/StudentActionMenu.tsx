import { type MenuItemProps } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import ActionMenu from "@/components/ActionMenu";
import EditStudentModal from "@/pages/admin/modals/EditStudentModal";
import { studentQueries } from "@/query/students";

interface StudentActionMenuProps {
  student: {
    id: number;
    status: string;
    name: string;
    username: string;
    age: number;
    sex: string;
  };
}

export default function StudentActionMenu({ student }: StudentActionMenuProps) {
  const queryClient = useQueryClient();
  const isArchived = student.status === "Archived";

  const { mutate: archiveStudent } = useMutation({
    ...studentQueries.archive(student.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentQueries.lists() });
    },
  });

  const menuItems: MenuItemProps[] = [
    {
      children: "Change password",
      onClick: (e) => {
        e.stopPropagation();
        EditStudentModal.ChangePassword(student);
      },
    },
    {
      children: isArchived ? "Unarchive" : "Archive",
      c: "red",
      onClick: (e) => {
        e.stopPropagation();
        const nextStatus = isArchived ? "UNARCHIVE" : "ARCHIVE";
        EditStudentModal.Archive(student, () => {
          archiveStudent({ status: nextStatus });
        });
      },
    },
  ];

  return (
    <ActionMenu
      items={menuItems}
      actionIconProps={{ onClick: (e) => e.stopPropagation() }}
    />
  );
}
