import { modals } from "@mantine/modals";
import { Text, Divider, Paper, Group, Stack, Button, ActionIcon } from '@mantine/core';
import { IconPill } from '@tabler/icons-react';
import dayjs from "dayjs";

import type { StudentShow } from "@/types/students";

import StudentInClinicModalForm from "@/pages/admin/modals/contents/StudentInClinicModalForm";
import MedicineModal from "./MedicineModal";
import VisitModal from "./VisitModal";

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
  children: (<StudentInClinicModalForm studentData={studentdata} />
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
      <Stack gap="md" mt="xs">
        <Paper p="sm" radius="md" bg="gray.1">
          <Text fw={700} color="blue.9">
            {studentdata.name}
          </Text>
          <Text size="sm" c="dimmed">
            {[studentdata.grade_level, studentdata.year_level, studentdata.course]
              .filter(Boolean)
              .join(' | ')}
          </Text>
        </Paper>

        <Stack gap="xs">
          <Group justify="space-between">
            <Text c="dimmed" size="sm">Checked in</Text>
            <Text fw={600} size="sm">
              {studentdata.check_in_time
                ? new Date(studentdata.check_in_time).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
                : '-'}
            </Text>
          </Group>

          <Group justify="space-between">
            <Text c="dimmed" size="sm">Reason</Text>
            <Text fw={600} size="sm">{studentdata.reason_for_visit || '-'}</Text>
          </Group>

          <Group justify="space-between">
            <Text c="dimmed" size="sm">Remarks</Text>
            <Text fw={600} size="sm">{studentdata.remarks || '-'}</Text>
          </Group>

          <Group justify="space-between">
            <Text c="dimmed" size="sm">Bed</Text>
            <Text fw={600} size="sm">{studentdata.bed_id || '-'}</Text>
          </Group>

          <Group justify="space-between" align="flex-start">
            <Text c="dimmed" size="sm">Medicine given</Text>
            <Stack gap={2} align="flex-end">
              {studentdata.items_dispensed && studentdata.items_dispensed.length > 0 ? (
                studentdata.items_dispensed.map((item: any, index: number) => (
                  <Text key={index} fw={600} size="sm" ta="right">
                    {`${item.item_name} (${item.quantity_dispensed} ${item.unit.toLowerCase()})`}
                  </Text>
                ))
              ) : (
                <Text fw={600} size="sm" c="dimmed">None</Text>
              )}
            </Stack>
          </Group>
        </Stack>

        <Group mt="md" gap="sm">
          <ActionIcon variant="light" size="xl" radius="xl" color="blue" onClick={() => {
            MedicineModal.Give(studentdata, "Medicine" as any);

            modals.close(modalId);
          }}>
            <IconPill size={20} />
          </ActionIcon>
          <Button fullWidth radius="xl" color="blue.9" style={{ flex: 1 }} onClick={() => {
            VisitModal.CheckOut(studentdata.student_number, dayjs(studentdata.check_in_time).format("YYYY-MM-DD"), studentdata.id, studentdata.id);
          }}>
            Check out
          </Button>
        </Group>
      </Stack>
    ),
    onClose: onClose
  });
};

const StatusModal = {
  StudentCheckIn,
  StudentInClinic
}

export default StatusModal;
