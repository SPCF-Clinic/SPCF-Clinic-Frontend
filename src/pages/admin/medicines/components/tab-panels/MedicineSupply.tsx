import { Button, Group, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";

import { SearchFilter } from "@/components/SearchFilter";
import { useItems } from "@/hooks/items/useItems";
import { useIsSuperAdmin } from "@/hooks/useIsSuperAdmin";
import type { ItemIndex, ItemType } from "@/types/items";
import { SEARCH_KEYS } from "../../searchKeys";
import ItemFormModal from "../item-form/ItemFormModal";
import MedicineSupplyTable from "./MedicineSupplyTable";

interface MedicineSupplyProps {
  type: ItemType;
}

export default function MedicineSupply({ type }: MedicineSupplyProps) {
  const { isFetching } = useItems({ type });
  const searchKey = SEARCH_KEYS[type];

  const [opened, { open, close }] = useDisclosure(false);
  const [selectedItem, setSelectedItem] = useState<ItemIndex | null>(null);

  const isSuperAdmin = useIsSuperAdmin();

  const handleAdd = () => {
    setSelectedItem(null);
    open();
  };

  const handleEdit = (item: ItemIndex) => {
    setSelectedItem(item);
    open();
  };

  return (
    <>
      <Stack>
        <Group justify="space-between">
          <SearchFilter
            queryKey={searchKey}
            textInputProps={{ loading: isFetching }}
          />

          {isSuperAdmin && (
            <Button
              size="md"
              fz="sm"
              leftSection={<IconPlus size={20} />}
              onClick={handleAdd}
            >
              Add {type}
            </Button>
          )}
        </Group>
        <MedicineSupplyTable type={type} onEdit={handleEdit} />
      </Stack>

      <ItemFormModal
        opened={opened}
        onClose={close}
        {...(selectedItem ? { item: selectedItem } : { itemType: type })}
        onExitTransitionEnd={() => setSelectedItem(null)}
      />
    </>
  );
}
