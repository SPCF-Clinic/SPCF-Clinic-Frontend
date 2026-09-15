import React, { useRef } from "react";
import { LoadingOverlay, Text, Group, Stack, Button, Paper, TextInput } from "@mantine/core";
import {Modals} from "@mantine/modals";
import { PrintButton } from "@/components/PrintButton";
import { useSingleCheckInDetails } from "@/hooks/check-ins/useSingleCheckInDetails";
import { useCheckOutStudent } from "@/hooks/check-ins/useCheckOut";

export default function VisitDetailsSummary({ id, checkInId, showCheckOut = true, checkOut = false }: { id: any, checkInId: any, showCheckOut?: boolean, checkOut?: boolean }) {
    const { data: singleCheckInDetails, isLoading, isError } = useSingleCheckInDetails(checkInId);

    const contentRef = useRef<HTMLDivElement>(null);

    const { mutate: checkOutStudent } = useCheckOutStudent(id);

    if (isLoading) {
        return <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />;
    }

    if (isError || !singleCheckInDetails?.data) {
        return <Text color="red" size="sm">Error occurred while fetching check-in details.</Text>;
    }

    const visitData = singleCheckInDetails.data;

    const formatTime = (timeString?: string | null) => {
        if (!timeString) return '--';
        const date = new Date(timeString.replace(' ', 'T'));
        return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    };

    const classInfo = [visitData.grade_level, visitData.course, visitData.year_level]
        .filter(Boolean)
        .join(' | ');

        const handleCheckOut = () => {
            checkOutStudent(checkInId, {
                onSuccess: () => {  
                    Modals.closeAll(); 
                }
            });
        };

    return (
        <Stack w={"50%"} gap="md">
            <div ref={contentRef}>
                <Stack gap="md">
                    <div>
                        <Text fw={700} size="xl" lh={1.2}>
                            {visitData.name || "Unknown Patient"}
                        </Text>
                        {classInfo && (
                            <Text c="dimmed" size="sm">
                                {classInfo}
                            </Text>
                        )}
                    </div>

                    <Stack gap="xs">
                        <Group justify="space-between">
                            <Text c="dimmed" size="sm">Checked in</Text>
                            <Text size="sm">{formatTime(visitData.check_in_time)}</Text>
                        </Group>
                        <Group justify="space-between">
                            <Text c="dimmed" size="sm">Checked out</Text>
                            {showCheckOut && <Text size="sm">{visitData.check_out_time ? formatTime(visitData.check_out_time) : "--"}</Text>}
                        </Group>
                    </Stack>

                    <Paper bg="gray.4" radius="md" p="md">
                        <Stack gap="sm">
                            <Group justify="space-between">
                                <Text size="xs">Reason</Text>
                                <Text size="sm">{visitData.reason_for_visit || "--"}</Text>
                            </Group>

                            <Group justify="space-between">
                                <Text size="xs">Remarks</Text>
                                <Text size="sm">{visitData.remarks || "--"}</Text>
                            </Group>

                            <Group justify="space-between">
                                <Text size="xs">Bed</Text>
                                <Text size="sm">{visitData.bed_id || "--"}</Text>
                            </Group>

                            <Group justify="space-between" align="flex-start">
                                <Text size="xs">Medicine given</Text>
                                <Stack gap={2} align="flex-end">
                                    {visitData.items_dispensed && visitData.items_dispensed.length > 0 ? (
                                        visitData.items_dispensed.map((item: any, index: number) => (
                                            <Text key={index} size="sm">
                                                {item.item_name} - {item.quantity_dispensed} {item.unit}
                                            </Text>
                                        ))
                                    ) : (
                                        <Text size="xs">None</Text>
                                    )}
                                </Stack>
                            </Group>
                        </Stack>
                    </Paper>
                </Stack>
            </div>
            {checkOut && <TextInput label="Notes (Optional)" placeholder="e.g. Advised to rest"></TextInput>}


            {checkOut ? (
                <Button fullWidth radius="xl" color="blue.9" onClick={() => {
                    handleCheckOut()
                    console.log("Check out clicked for student ID:", id, "Check-in ID:", checkInId);
                }}>
                    Check Out
                </Button>
            ) : <PrintButton
                fullWidth
                radius="xl"
                size="md"
                color="indigo"
                variant="filled"
                printOptions={{
                    contentRef,
                    documentTitle: `Visit_Summary_${visitData.name || id}`,
                }}
            >
                Print
            </PrintButton>}

        </Stack>
    );
}