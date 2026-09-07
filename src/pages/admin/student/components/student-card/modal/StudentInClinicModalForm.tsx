import { useState } from "react";
import {
  Button,
  Group,
  Radio,
  TextInput,
  Select
} from "@mantine/core";
import { TimeInput  } from "@mantine/dates";
import { useForm } from "@mantine/form";

import type { StudentShow } from "@/types/students";

import { useBeds } from "@/hooks/beds/useBeds";

interface StudentInClinicFormProps {
  studentData: StudentShow;
}

export default function StudentInClinicModalForm({
  studentData,
}: StudentInClinicFormProps) {

  const { data: listOfBeds, isLoading } = useBeds()

  const [isAssigned, setIsAssigned] = useState<boolean>(false)

  const form = useForm({
    initialValues: {
      user_id: studentData.id,
      bed_id: "",
      time_expires_at: "",
      reason_for_visit: "",
      remarks: ""
    }
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log(values);

    // API request here
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
        placeholder="Remarks"
        size="sm"
        mt="md"
        {...form.getInputProps("remarks")}
      />

      <Radio.Group
        label="Assign bed?"
        mt="md"
        value={isAssigned ? "yes" : "no"}
        onChange={(value) => setIsAssigned(value === "yes")}
      >
        <Group grow my={5}>
          <Radio value="yes" label="Yes" />
          <Radio value="no" label="No" />
        </Group>
      </Radio.Group>
      {isAssigned &&
        <>
          <Select
            placeholder="Choose Bed"
            data={listOfBeds?.pages[0].data.data.map((bed) => ({
              value: String(bed.id),
              label: bed.bed_number,
            })) ?? []} {...form.getInputProps("bed_id")} />

          <TimeInput  label="Enter time" />


        </>}

      <Button
        type="submit"
        mt={20}
        fullWidth
      >
        Check in
      </Button>
    </form>
  );
}