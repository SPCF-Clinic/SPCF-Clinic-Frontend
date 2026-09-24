import { modals } from "@mantine/modals";
import {  Text, } from '@mantine/core';

import type { StudentShow } from "@/types/students";

import StudentCheckInClinicModalForm from "@/pages/admin/modals/contents/StudentCheckInClinicModalForm";
import StudentAssignBedModal from "@/pages/admin/modals/contents/StudentAssignBedModal";
import StudentInClinicModal from "@/pages/admin/modals/contents/StudentInClinicModal";

import ActiveTimerModalContent from "@/pages/admin/modals/contents/ActiveTimersModalContent";

const StudentCheckIn = (studentdata: StudentShow) => modals.open({
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
  children: (<StudentCheckInClinicModalForm studentData={studentdata} />
  ),

});

const AssignBed = (studentdata: StudentShow) => modals.open({
  centered: true,
  size: 400,
  title: (<>
    <Text size="xl" fw={700}>
      Assign Bed
    </Text>
    <Text size="sm" c="dimmed">
      Student Number: {studentdata.username}
    </Text>
  </>),
  children: (<StudentAssignBedModal studentData={studentdata} />
  ),

});

const StudentInClinic = (studentdata: any, onClose: () => void) => {
  console.log(studentdata)
  const modalId = `student-modal-${studentdata.id}`;
  modals.open({
    modalId: modalId,
    centered: true,
    size: 400,
    title: (
      <Text size="xl" fw={700}>
        In Clinic
      </Text>
    ),
    children: (
      <StudentInClinicModal
        studentdata={studentdata}
        modalId={modalId}
      />
    ),
    onClose: onClose
  });
};


const ActiveTimer = (studentdata: any) =>
  modals.open({
    title: (
      <Text fw={700} size="xl">
        {studentdata.bed_number}
      </Text>
    ),
    centered: true,
    radius: 'lg',
    padding: 'lg',
    styles: {
      header: {
        borderBottom: '1px solid #0f0f0f',
        paddingBottom: '12px',
        marginBottom: '20px',
      },
    },
    children: <ActiveTimerModalContent studentdata={studentdata} />,
  });


const StatusModal = {
  StudentCheckIn,
  StudentInClinic,
  AssignBed,
  ActiveTimer
}

export default StatusModal;
