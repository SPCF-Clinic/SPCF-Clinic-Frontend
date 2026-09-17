import { modals } from "@mantine/modals";
import { Text } from "@mantine/core";

import type { StudentShow } from "@/types/students";
import EditStudentModalForm from "./contents/EditStudentModalForm";

const Edit = (studentData: StudentShow) => {
	modals.open({
		modalId: `edit-student-${studentData.id}`,
		centered: true,
		size: "xl",
		title: <Text fw={700}>Edit personal information</Text>,
		children: <EditStudentModalForm studentData={studentData} />,
	});
};

const EditStudentModal = { Edit };

export default EditStudentModal;