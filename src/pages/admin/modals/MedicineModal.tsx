import { modals } from "@mantine/modals";
import { Text, Divider,Box } from '@mantine/core';

import type {ItemType} from "@/types/items";

import GiveMedicationModalForm from "@/pages/admin/modals/contents/GiveMedicationModalForm";

const Give = (studentData: any, type: ItemType) => modals.open({
    centered: true,
    size: 400,
    title: (<>
        <Text size="xl" fw={700}>
            Give Medication
        </Text>
        <Text size="sm" c="dimmed">
            {studentData.full_name} Juan Tamad - {studentData.check_in.bed}
        </Text>
    </>),
      children: (<Box w="100%">
        <Divider size="2px" variant="solid" color="gray.3" />
        <GiveMedicationModalForm studentData={studentData} type={type}/>
        </Box>
      ),
})

const MedicineModal = {
    Give
}

export default MedicineModal