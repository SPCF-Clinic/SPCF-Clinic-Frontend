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
import { useBeds } from "@/hooks/beds/useBeds";
import { useUpdateCheckIn } from "@/hooks/check-ins/useUpdateCheckIn";

interface StudentInClinicFormProps {
    studentData: StudentShow;
}

export default function StudentAssignBed({
    studentData,
}: StudentInClinicFormProps) {
    const queryClient = useQueryClient();

    console.log("Student Data:", studentData); // Debugging line to check the studentData

    console.log("Student Check-in ID:", studentData.check_in?.id); // Debugging line to check the student's check-in ID

    const { data: listOfBeds } = useBeds();
    const { mutate: updateCheckIn, isPending } = useUpdateCheckIn(studentData.check_in?.id);

    const form = useForm({
        initialValues: {
            bed_id: null,
            timer_expires_at: null,
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        let formattedExpiresAt = null;

        if (values.bed_id && values.timer_expires_at) {
            formattedExpiresAt = dayjs()
                .add(Number(values.timer_expires_at), "minute")
                .format("YYYY-MM-DD HH:mm:ss");
        }

        const payload = {
            ...values,
            bed_id: values.bed_id,
            timer_expires_at: formattedExpiresAt,
        };

        updateCheckIn(payload, {
            onSuccess: () => {
                modals.closeAll();

                queryClient.invalidateQueries({
                    queryKey: studentQueries.detail(studentData.id).queryKey,
                });
            },
        });
    };

    const timeLimitOptions = Array.from({ length: 12 }, (_, index) => {
        const minutes = (index + 1) * 5;

        return {
            value: String(minutes),
            label: `${minutes} minutes`,
        };
    });

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>


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

                <Select
                    label="Set Bed Time Limit"
                    placeholder="Choose duration"
                    mt="sm"
                    data={timeLimitOptions}
                    {...form.getInputProps("timer_expires_at")}
                />
            </>


            <Button type="submit" loading={isPending} mt={20} fullWidth>
                Check in
            </Button>
        </form>
    );
}