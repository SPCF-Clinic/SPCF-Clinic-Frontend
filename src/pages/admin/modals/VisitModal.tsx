import { modals } from "@mantine/modals";
import { Text, Divider, Flex } from '@mantine/core';

import VisitLogSummaryContent from "@/pages/admin/modals/contents/VisitLogSummaryContent";
import VisitDetailsSummary from "@/pages/admin/modals/contents/VisitDetailsSummaryContent";

const VisitSummary = (date: any, id: any, checkInId: any) => modals.open({
    centered: true,
    size: 700,
    title: (<>
        <Text size="xl" fw={700}>
            Visit Summary
        </Text>
        <Text size="sm" c="dimmed">
            {date}
        </Text>
    </>),
    children: (<>
        <Divider size="2px" variant="solid" color="gray.3" />
        <Flex gap="md" mt="md">
            <VisitDetailsSummary id={id} checkInId={checkInId} />
            <VisitLogSummaryContent studentNumber={id} date={date}/>
        </Flex>
    </>
    ),
});

const CheckOut = (studentNumber: string , date: any, id: any, checkInId: any) => modals.open({
    centered: true,
    size: 800,  
    title: (<>
        <Text size="xl" fw={700}>
            Check Out Student
        </Text>
        <Text size="sm" c="dimmed">
            Student Number: {studentNumber}
        </Text>
    </>),
    children: (<>
        <Divider size="2px" variant="solid" color="gray.3" />
        <Flex gap="md" mt="md">
            <VisitDetailsSummary id={id} checkInId={checkInId} showCheckOut={false} checkOut={true} />
            <VisitLogSummaryContent studentNumber={id} date={date} height={500}/>
        </Flex>
    </>
    ),
});

const VisitModal = {
    VisitSummary,
    CheckOut,
}

export default VisitModal