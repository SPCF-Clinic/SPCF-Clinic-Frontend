import { modals } from "@mantine/modals";
import { Text } from "@mantine/core";

import type { StudentShow } from "@/types/students";
import AccountModal from "./AccountModal";
import ArchiveStudentModalContent from "./contents/ArchiveStudentModalContent";
import EditStudentModalForm from "./forms/EditStudentModalForm";

interface ArchiveTarget {
  id: number;
  full_name: string | null;
  status: string;
}

interface ChangePasswordTarget {
  id: number;
  full_name: string | null;
  username: string;
}

const Edit = (studentData: StudentShow) => {
  modals.open({
    modalId: `edit-student-${studentData.id}`,
    centered: true,
    size: "xl",
    title: <Text fw={700}>Edit personal information</Text>,
    children: <EditStudentModalForm studentData={studentData} />,
  });
};

export const ChangePassword = (studentData: ChangePasswordTarget) =>
  AccountModal.ChangePassword({
    id: studentData.id,
    name: studentData.full_name,
    username: studentData.username,
  });

export const Archive = (studentData: ArchiveTarget) => {
  const modalId = `archive-student-${studentData.id}`;

  modals.open({
    modalId,
    title: "Archive Student",
    centered: true,
    children: (
      <ArchiveStudentModalContent
        modalId={modalId}
        studentId={studentData.id}
        fullName={studentData.full_name}
        status={studentData.status}
      />
    ),
  });
};

const EditStudentModal = { Edit, ChangePassword, Archive };

export default EditStudentModal;
