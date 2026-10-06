import { Paper, Text, Stack, Group, ActionIcon, Button } from "@mantine/core";
import { IconPill } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import dayjs from "dayjs";

import MedicineModal from "@/pages/admin/modals/MedicineModal";
import VisitModal from "@/pages/admin/modals/VisitModal";

interface StudentInClinicModalProps {
  studentdata: any;
  modalId?: string;
  onAssignBed?: () => void;
}

export default function StudentInClinicModal({
  studentdata,
  modalId,
  onAssignBed,
}: StudentInClinicModalProps) {
  const handleGiveMedicine = () => {
    MedicineModal.Give(studentdata, "Medicine" as any);
    if (modalId) {
      modals.close(modalId);
    }
  };

  console.log("Student Data in Modal:", studentdata);
  const handleCheckOut = () => {
    VisitModal.CheckOut(
      studentdata.student_number,
      dayjs(studentdata.check_in_time).format("YYYY-MM-DD"),
      studentdata.user_id,
      studentdata.id,
    );
  };

  return (
    <Stack gap="md" mt="xs">
      <Paper p="sm" radius="md" bg="gray.1">
        <Text fw={700} c="blue.9">
          {studentdata.name}
        </Text>
        <Text size="sm" c="dimmed">
          {[studentdata.grade_level, studentdata.year_level, studentdata.course]
            .filter(Boolean)
            .join(" | ")}
        </Text>
      </Paper>

      <Stack gap="xs">
        <Group justify="space-between">
          <Text c="dimmed" size="sm">
            Checked in
          </Text>
          <Text fw={600} size="sm">
            {studentdata.check_in_time
              ? new Date(studentdata.check_in_time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "-"}
          </Text>
        </Group>

        <Group justify="space-between">
          <Text c="dimmed" size="sm">
            Reason
          </Text>
          <Text fw={600} size="sm">
            {studentdata.reason_for_visit || "-"}
          </Text>
        </Group>

        <Group justify="space-between">
          <Text c="dimmed" size="sm">
            Remarks
          </Text>
          <Text fw={600} size="sm">
            {studentdata.remarks || "-"}
          </Text>
        </Group>

        <Group justify="space-between">
          <Text c="dimmed" size="sm">
            Bed
          </Text>
          {studentdata.bed_id ? (
            <Text fw={600} size="sm">
              {studentdata.bed_id}
            </Text>
          ) : (
            <Button
              variant="transparent"
              td="underline"
              onClick={onAssignBed}
              px={0}
            >
              Assign
            </Button>
          )}
        </Group>

        <Group justify="space-between" align="flex-start">
          <Text c="dimmed" size="sm">
            Medicine given
          </Text>
          <Stack gap={2} align="flex-end">
            {studentdata.items_dispensed &&
            studentdata.items_dispensed.length > 0 ? (
              studentdata.items_dispensed.map((item: any, index: number) => (
                <Text key={index} fw={600} size="sm" ta="right">
                  {`${item.item_name} (${item.quantity_dispensed} ${item.unit === null ? "" : item.unit})`}
                </Text>
              ))
            ) : (
              <Text fw={600} size="sm" c="dimmed">
                None
              </Text>
            )}
          </Stack>
        </Group>
      </Stack>

      {/* Action Buttons */}
      <Group mt="md" gap="sm">
        <ActionIcon
          variant="light"
          size="xl"
          radius="xl"
          color="blue"
          onClick={handleGiveMedicine}
        >
          <IconPill size={20} />
        </ActionIcon>
        <Button
          fullWidth
          radius="xl"
          color="blue.9"
          style={{ flex: 1 }}
          onClick={handleCheckOut}
        >
          Check out
        </Button>
      </Group>
    </Stack>
  );
}
