import { Button, Select, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";

import { useBeds } from "@/hooks/beds/useBeds";
import { useUpdateCheckIn } from "@/hooks/check-ins/useUpdateCheckIn";
import { studentQueries } from "@/query/students";
import type { StudentShow } from "@/types/students";
import {
  BED_TIME_LIMIT_OPTIONS,
  formatBedTimer,
  getAssignableBedOptions,
  validateBedId,
  validateBedTimer,
} from "@/utils/checkInBedForm";

interface StudentInClinicFormProps {
  studentData: StudentShow;
}

interface AssignBedFormValues {
  bed_id: string | null;
  timer_expires_at: string | null;
}

export default function StudentAssignBed({
  studentData,
}: StudentInClinicFormProps) {
  const checkInId = studentData.check_in?.id;

  if (checkInId === null || checkInId === undefined) return null;

  return (
    <StudentAssignBedForm studentData={studentData} checkInId={checkInId} />
  );
}

function StudentAssignBedForm({
  studentData,
  checkInId,
}: StudentInClinicFormProps & { checkInId: number }) {
  const queryClient = useQueryClient();

  const { data: listOfBeds, isFetching } = useBeds();
  const { mutate: updateCheckIn, isPending } = useUpdateCheckIn(checkInId);

  const bedOptions = getAssignableBedOptions(listOfBeds?.pages[0].data.data);
  const hasNoBeds = !isFetching && bedOptions.length === 0;

  const form = useForm<AssignBedFormValues>({
    initialValues: {
      bed_id: null,
      timer_expires_at: null,
    },
    validate: {
      bed_id: validateBedId,
      timer_expires_at: validateBedTimer,
    },
  });

  const handleSubmit = (values: AssignBedFormValues) => {
    const formattedExpiresAt =
      values.bed_id && values.timer_expires_at
        ? formatBedTimer(values.timer_expires_at)
        : null;

    updateCheckIn(
      {
        ...values,
        bed_id: values.bed_id,
        timer_expires_at: formattedExpiresAt,
      },
      {
        onSuccess: () => {
          modals.closeAll();

          queryClient.invalidateQueries({
            queryKey: studentQueries.detail(studentData.id).queryKey,
          });
        },
      },
    );
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Select
        placeholder="Choose Bed"
        mt="xs"
        data={bedOptions}
        disabled={hasNoBeds}
        {...form.getInputProps("bed_id")}
      />

      <Select
        label="Set Bed Time Limit"
        placeholder="Choose duration"
        mt="sm"
        data={BED_TIME_LIMIT_OPTIONS}
        {...form.getInputProps("timer_expires_at")}
      />

      {hasNoBeds && (
        <Text size="sm" c="dimmed" mt="xs">
          No beds are available right now.
        </Text>
      )}

      <Button
        type="submit"
        loading={isPending}
        disabled={hasNoBeds}
        mt={20}
        fullWidth
      >
        Check in
      </Button>
    </form>
  );
}
