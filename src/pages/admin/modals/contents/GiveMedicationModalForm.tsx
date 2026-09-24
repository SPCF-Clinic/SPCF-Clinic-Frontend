import { Select, Stack, NumberInput, Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "@mantine/form";

import { useItems } from "@/hooks/items/useItems";
import { useDispenseItem } from "@/hooks/check-ins/useDispenseItem";
import { studentQueries } from "@/query/students";

import type { ItemType } from "@/types/items";

interface GiveMedicationModalFormProps {
  studentData: any;
  type: ItemType;
}

export default function GiveMedicationModalForm({ studentData, type }: GiveMedicationModalFormProps) {
  const queryClient = useQueryClient();

  const { data: medicineItems, isFetching } = useItems({ type });
  const { mutate: dispenseItem, isPending } = useDispenseItem();

  const form = useForm({
    initialValues: {
      dispensed_item_id: "",
      dispensed_item_quantity: 1,
    },
    validate: {
      dispensed_item_id: (value) => (!value ? "Please select a medicine" : null),
      dispensed_item_quantity: (value, values) => {
        if (!value || value < 1) return "Quantity must be at least 1";
        const selected = medicineItems?.data?.items.find(
          (item) => String(item.id) === values.dispensed_item_id
        );
        if (selected && value > selected.quantity) {
          return `Quantity cannot exceed available stock (${selected.quantity})`;
        }
        return null;
      },
    },
  });

  const selectedMedicine = medicineItems?.data?.items.find(
    (item) => String(item.id) === form.values.dispensed_item_id
  );

  const handleSubmit = (values: typeof form.values) => {
    const payload = {
      dispensed_item_id: values.dispensed_item_id,
      dispensed_item_quantity: String(values.dispensed_item_quantity),
    };

    const checkInId =
      Number(studentData?.check_in?.id) ||
      Number(studentData?.check_in_id) ||
      Number(studentData?.id);

    if (!checkInId) return;

    dispenseItem(
      { id: checkInId, payload },
      {
        onSuccess: () => {
          modals.closeAll();

          const studentId = studentData?.student_id || studentData?.id;
          if (studentId) {
            queryClient.invalidateQueries({
              queryKey: studentQueries.detail(studentId).queryKey,
            });
          }
        },
      }
    );
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="sm">
        <Select
          label="Medicine"
          placeholder="Select medicine"
          disabled={isFetching}
          data={(medicineItems?.data?.items ?? []).map((med) => ({
            value: String(med.id),
            label: med.name,
          }))}
          {...form.getInputProps("dispensed_item_id")}
        />

        {selectedMedicine && (
          <Text size="xs" c="dimmed">
            {selectedMedicine.total_content}{" "}
            {selectedMedicine.item_content
              ? selectedMedicine.item_content.content_unit
              : selectedMedicine.unit.toLowerCase()}{" "}
            available
          </Text>
        )}

        <NumberInput
          label="Quantity"
          min={1}
          max={selectedMedicine?.quantity}
          clampBehavior="strict"
          {...form.getInputProps("dispensed_item_quantity")}
        />

        <Button
          type="submit"
          fullWidth
          radius="xl"
          size="md"
          mt="xs"
          color="indigo"
          loading={isPending}
        >
          Confirm
        </Button>
      </Stack>
    </form>
  );
}