import { useState } from "react";
import {
  Button,
  Group,
  Radio,
  TextInput,
  Select,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { useQueryClient } from "@tanstack/react-query";

import { studentQueries } from "@/query/students";
import type { StudentShow } from "@/types/students";
import { useBeds  } from "@/hooks/beds/useBeds";
import {useCheckInStudent} from "@/hooks/check-ins/useCheckInStudent";

interface StudentInClinicFormProps {
  studentData: StudentShow;
}

export default function StudentInClinicModalForm({
  studentData,
}: StudentInClinicFormProps) {
  const queryClient = useQueryClient();

  const { data: listOfBeds } = useBeds();
  const { mutate: checkInStudent, isPending, } = useCheckInStudent();

  const [isAssigned, setIsAssigned] = useState<boolean>(false);

  const form = useForm({
    initialValues: {
      user_id: studentData.id,
      bed_id: "",
      timer_expires_at: "", // Stores the time string (e.g. "10:50:00")
      reason_for_visit: "",
      remarks: "",
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    let formattedExpiresAt = "";

    if (isAssigned && values.timer_expires_at) {
      const today = dayjs().format("YYYY-MM-DD");
      formattedExpiresAt = `${today} ${values.timer_expires_at}`;
    }

    const payload = {
      ...values,
      bed_id: isAssigned ? values.bed_id : null,
      timer_expires_at: formattedExpiresAt,
    };

    console.log("Submitting payload:", payload);
    checkInStudent(payload, {
      onSuccess: () => {
        modals.closeAll();

          queryClient.invalidateQueries({
        queryKey: studentQueries.detail(studentData.id).queryKey,
      });
      }
    });
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
            form.setFieldValue("timer_expires_at", "");
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
            data={
              listOfBeds?.pages[0].data.data
              .filter((bed) => bed.status !== "Occupied")
              .map((bed) => ({
                value: String(bed.id),
                label: bed.bed_number,
              })) ?? []
            }
            {...form.getInputProps("bed_id")}
          />

          <TimeInput
            label="Set Bed Time Limit"
            mt="sm"
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