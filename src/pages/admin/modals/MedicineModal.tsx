import { modals } from "@mantine/modals";
import { Text, Divider, Box } from '@mantine/core';

import type { ItemType } from "@/types/items";
import GiveMedicationModalForm from "@/pages/admin/modals/contents/GiveMedicationModalForm";

const Give = (studentData: any, type: ItemType) => {
  modals.open({
    modalId: `medicine-modal-${studentData.id}`,
    centered: true,
    size: 400,
    title: (
      <>
        <Text size="xl" fw={700}>
          Give Medication
        </Text>
        <Text size="sm" c="dimmed">
          {studentData.name || studentData.full_name} - {studentData.bed_id || studentData.check_in?.bed || 'No Bed'}
        </Text>
      </>
    ),
    children: (
      <Box w="100%">
        <Divider size="2px" variant="solid" color="gray.3" />
        <GiveMedicationModalForm studentData={studentData} type={type} />
      </Box>
    ),
  });
};

const MedicineModal = {
  Give,
};

export default MedicineModal;