import { modals } from "@mantine/modals";
import { Text, Divider } from '@mantine/core';

import type {ItemType} from "@/types/items";

import GiveMedicationModalForm from "@/pages/admin/student/components/student-card/modals/GiveMedicationModalForm.tsx";

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
      children: (<>
        <Divider size="2px" variant="solid" color="gray.3" />
        <GiveMedicationModalForm studentData={studentData} type={type}/>
        </>
      ),
})

const MedicineModal = {
    Give
}

export default MedicineModal