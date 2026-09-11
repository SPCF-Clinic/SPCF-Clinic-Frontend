import { Select, Stack, NumberInput, Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "@mantine/form";

import { useItems } from "@/hooks/items/useItems";
import { useDispenseItem } from "@/hooks/check-ins/useDispenseItem";
import { studentQueries } from "@/query/students";

import type { ItemIndex, ItemType } from "@/types/items";

interface GiveMedicationModalFormProps {
    studentData: any;
    type: ItemType;
}

export default function GiveMedicationModalForm({ studentData, type }: GiveMedicationModalFormProps) {
    const queryClient = useQueryClient();

    const form = useForm({
        initialValues: {
            dispensed_item_id: "",
            dispensed_item_quantity: "",
        },
    });
    const { data: medicineItems, isFetching } = useItems({ type });
    const { mutate: dispenseItem, isPending } = useDispenseItem();

    const selectedMedicine = medicineItems?.data?.items.find(
        (item) => String(item.id) === form.values.dispensed_item_id
    );

    console.log(studentData);

    const handleSubmit = (values: typeof form.values) => {
        const payload = {
            dispensed_item_id: values.dispensed_item_id,
            dispensed_item_quantity: String(values.dispensed_item_quantity),
        };
        const id = studentData.check_in.id;
        dispenseItem({ id, payload }, {
            onSuccess: () => {
                modals.closeAll();

                queryClient.invalidateQueries({
                    queryKey: studentQueries.detail(studentData.id).queryKey,
                });
            }
        });
    };

    console.log("Medicine items:", medicineItems?.data?.items);
    return (
        <><form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="sm">
                <Select
                    label="Medicine"
                    placeholder="Select medicine"
                    data={medicineItems?.data?.items.map((med) => ({
                        value: String(med.id),
                        label: med.name,
                    }))}
                    {...form.getInputProps("dispensed_item_id")}
                />
                {selectedMedicine && (
                    <Text size="xs" c="dimmed">
                        {selectedMedicine.quantity} {selectedMedicine.unit.toLowerCase()} available
                    </Text>
                )}
                <NumberInput
                    label="Quantity"
                    min={1}
                    max={selectedMedicine?.quantity}
                    clampBehavior="strict"
                    {...form.getInputProps("dispensed_item_quantity")}
                />

                <Button type="submit" fullWidth radius="xl" size="md" mt="xs" color="indigo" loading={isPending}    >
                    Confirm
                </Button>
            </Stack>
        </form></>
    )
}