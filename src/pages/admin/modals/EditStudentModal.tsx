import { modals } from '@mantine/modals';
import { Text,} from '@mantine/core';

import type { StudentShow } from "@/types/students";
import EditStudentModalForm from "./forms/EditStudentModalForm";
import ChangePasswordForm from './forms/ChangePasswordForm';

const Edit = (studentData: StudentShow) => {
	modals.open({
		modalId: `edit-student-${studentData.id}`,
		centered: true,
		size: "xl",
		title: <Text fw={700}>Edit personal information</Text>,
		children: <EditStudentModalForm studentData={studentData} />,
	});
};



export const ChangePassword = (studentData: StudentShow) => {
  return modals.open({
    centered: true,
    radius: 'lg',
    size: 'sm',
    padding: 'lg',
    title: (
      <div>
        <Text fw={700} size="xl" lh={1.2}>
          Change Password
        </Text>
        <Text size="sm" c="dimmed">
          {studentData.full_name}
        </Text>
      </div>
    ),
    styles: {
      header: {
        borderBottom: '1px solid #e0e0e0',
        paddingBottom: '12px',
        marginBottom: '16px',
      },
    },
    children: <ChangePasswordForm studentId={studentData.id} />,
  });
};

export const Archive = (studentData: StudentShow, onConfirm: () => void) => {
    modals.openConfirmModal({
        title: "Archive Student",
        centered: true,
        children: (
            <Text size="sm">
                Are you sure you want to archive <b>{studentData.full_name}</b>? This action will disable their active account status.
            </Text>
        ),
        labels: { confirm: "Archive", cancel: "Cancel" },
        confirmProps: { color: "red" },
        onConfirm: onConfirm,
    });
};

const EditStudentModal = { Edit, ChangePassword,Archive };

export default EditStudentModal;