import { useState } from "react";
import { Button, Group, Radio, TextInput, Select } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";

import { useBeds } from "@/hooks/beds/useBeds";
import { useCheckInStudent } from "@/hooks/check-ins/useCheckInStudent";
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

interface CheckInFormValues {
  user_id: number;
  bed_id: string | null;
  timer_expires_at: string | null;
  reason_for_visit: string;
  remarks: string;
}

export default function StudentCheckInClinicModalForm({
  studentData,
}: StudentInClinicFormProps) {
  const queryClient = useQueryClient();

  const { data: listOfBeds } = useBeds();
  const { mutate: checkInStudent, isPending } = useCheckInStudent();

  const [isAssigned, setIsAssigned] = useState<boolean>(false);

  const bedOptions = getAssignableBedOptions(listOfBeds?.pages[0].data.data);

  const form = useForm<CheckInFormValues>({
    initialValues: {
      user_id: studentData.id,
      bed_id: "",
      timer_expires_at: null,
      reason_for_visit: "",
      remarks: "",
    },
    validate: {
      reason_for_visit: (value) =>
        value.trim() ? null : "Reason for visit is required",
      bed_id: (value) => (isAssigned ? validateBedId(value) : null),
      timer_expires_at: (value) =>
        isAssigned ? validateBedTimer(value) : null,
    },
  });

  const handleSubmit = (values: CheckInFormValues) => {
    const formattedExpiresAt =
      isAssigned && values.timer_expires_at
        ? formatBedTimer(values.timer_expires_at)
        : null;

    checkInStudent(
      {
        ...values,
        bed_id: isAssigned ? values.bed_id : null,
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
      <TextInput
        label="Reason for Visit"
        size="sm"
        {...form.getInputProps("reason_for_visit")}
      />

      <TextInput
        label="Remarks"
        size="sm"
        mt="md"
        {...form.getInputProps("remarks")}
      />

      <Radio.Group
        label="Assign bed?"
        mt="md"
        value={isAssigned ? "yes" : "no"}
        onChange={(value) => {
          const assigned = value === "yes";
          setIsAssigned(assigned);
          if (!assigned) {
            form.setFieldValue("bed_id", "");
            form.setFieldValue("timer_expires_at", null);
          }
        }}
      >
        <Group grow my={5}>
          <Radio.Card p={5} radius="md" value="yes">
            <Group wrap="nowrap" align="center">
              <Radio.Indicator />
              <span>Yes</span>
            </Group>
          </Radio.Card>

          <Radio.Card p={5} radius="md" value="no">
            <Group wrap="nowrap" align="center">
              <Radio.Indicator />
              <span>No</span>
            </Group>
          </Radio.Card>
        </Group>
      </Radio.Group>

      {isAssigned && (
        <>
          <Select
            placeholder="Choose Bed"
            mt="xs"
            data={bedOptions}
            {...form.getInputProps("bed_id")}
          />

          <Select
            label="Set Bed Time Limit"
            placeholder="Choose duration"
            mt="sm"
            data={BED_TIME_LIMIT_OPTIONS}
            {...form.getInputProps("timer_expires_at")}
          />
        </>
      )}

      <Button type="submit" loading={isPending} mt={20} fullWidth>
        Check in
      </Button>
    </form>
  );
}
