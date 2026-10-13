import ActionMenu, { type ActionMenuItem } from "@/components/ActionMenu";
import { useArchiveUserMutation } from "@/hooks/users/useArchiveUserMutation";
import EditStudentModal from "@/pages/admin/modals/EditStudentModal";
import type { StudentIndex } from "@/types/students";

interface StudentActionMenuProps {
  student: StudentIndex;
}

export default function StudentActionMenu({ student }: StudentActionMenuProps) {
  const isArchived = student.status === "Archived";

  const { mutate: archiveStudent } = useArchiveUserMutation(student.id);

  const modalTarget = {
    id: student.id,
    full_name: student.name,
    username: student.username,
    status: student.status,
  };

  const menuItems: ActionMenuItem[] = [
    {
      children: "Change password",
      onClick: (e) => {
        e.stopPropagation();
        EditStudentModal.ChangePassword(modalTarget);
      },
    },
    {
      children: isArchived ? "Unarchive" : "Archive",
      c: "red",
      onClick: (e) => {
        e.stopPropagation();
        const nextStatus = isArchived ? "UNARCHIVE" : "ARCHIVE";
        EditStudentModal.Archive(modalTarget, () => {
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
