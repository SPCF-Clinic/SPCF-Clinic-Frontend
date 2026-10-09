import { type MenuItemProps } from "@mantine/core";

import ActionMenu from "@/components/ActionMenu";
import { useArchiveUserMutation } from "@/hooks/users/useArchiveUserMutation";
import EditStudentModal from "@/pages/admin/modals/EditStudentModal";

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
  const isArchived = student.status === "Archived";

  const { mutate: archiveStudent } = useArchiveUserMutation(student.id);

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
