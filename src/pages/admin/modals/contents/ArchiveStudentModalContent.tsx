import { Button, Group, Text } from "@mantine/core";
import { modals } from "@mantine/modals";

import { useArchiveUserMutation } from "@/hooks/users/useArchiveUserMutation";

interface ArchiveStudentModalContentProps {
  modalId?: string;
  studentId: number;
  fullName: string | null;
  status: string;
}

/**
 * A custom dialog rather than `modals.openConfirmModal` because that variant
 * closes on confirm and snapshots its props, so it can never show a loading
 * state. Success and failure both toast from the mutation hook itself.
 */
export default function ArchiveStudentModalContent({
  modalId,
  studentId,
  fullName,
  status,
}: ArchiveStudentModalContentProps) {
  const isArchived = status === "Archived";
  const nextStatus = isArchived ? "UNARCHIVE" : "ARCHIVE";

  const { mutate: archiveStudent, isPending } = useArchiveUserMutation(studentId);

  const close = () => {
    if (modalId) modals.close(modalId);
  };

  return (
    <>
      <Text size="sm">
        Are you sure you want to archive <b>{fullName}</b>? This action will
        disable their active account status.
      </Text>

      <Group mt="lg" justify="flex-end">
        <Button variant="default" onClick={close} disabled={isPending}>
          Cancel
        </Button>
        <Button
          color={isArchived ? "blue" : "red"}
          loading={isPending}
          onClick={() =>
            archiveStudent(
              { status: nextStatus },
              { onSuccess: close },
            )
          }
        >
          {isArchived ? "Unarchive" : "Archive"}
        </Button>
      </Group>
    </>
  );
}