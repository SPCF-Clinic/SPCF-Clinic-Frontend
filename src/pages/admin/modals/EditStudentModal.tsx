import { modals } from "@mantine/modals";
import { Text } from "@mantine/core";

import type { StudentShow } from "@/types/students";
import AccountModal from "./AccountModal";
import EditStudentModalForm from "./forms/EditStudentModalForm";

const Edit = (studentData: StudentShow) => {
  modals.open({
    modalId: `edit-student-${studentData.id}`,
    centered: true,
    size: "xl",
    title: <Text fw={700}>Edit personal information</Text>,
    children: <EditStudentModalForm studentData={studentData} />,
  });
};

export const ChangePassword = (studentData: StudentShow) =>
  AccountModal.ChangePassword({
    id: studentData.id,
    name: studentData.full_name,
    username: studentData.username,
  });

export const Archive = (studentData: StudentShow, onConfirm: () => void) => {
  modals.openConfirmModal({
    title: "Archive Student",
    centered: true,
    children: (
      <Text size="sm">
        Are you sure you want to archive <b>{studentData.full_name}</b>? This
        action will disable their active account status.
      </Text>
    ),
    labels: {
      confirm: studentData?.status === "Archived" ? "Unarchive" : "Archive",
      cancel: "Cancel",
    },
    confirmProps: {
      color: studentData?.status === "Archived" ? "blue" : "red",
    },
    onConfirm: onConfirm,
  });
};

const EditStudentModal = { Edit, ChangePassword, Archive };

export default EditStudentModal;
