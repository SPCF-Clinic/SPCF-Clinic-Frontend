import { modals } from "@mantine/modals";
import { Text,} from '@mantine/core';

import type { StudentShow } from "@/types/students";

import StudentInClinicModalForm from "@/pages/admin/student/components/student-card/modals/StudentInClinicModalForm";

const StudentInClinic = (studentdata: StudentShow) => modals.open({
  centered: true,
  size: 400,
  title: (<>
    <Text size="xl" fw={700}>
      Check in student
    </Text>
    <Text size="sm" c="dimmed">
      Student Number: {studentdata.username}
    </Text>
  </>),
  children: (<StudentInClinicModalForm studentData={studentdata} />
  ),

});


const StatusModal = {
  StudentInClinic
}

export default StatusModal;
