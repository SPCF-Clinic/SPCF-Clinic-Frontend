import { Group, Stack } from "@mantine/core";

import { PrintButton } from "@/components/PrintButton";
import { SearchFilter } from "@/components/SearchFilter";
import { DateRangeFilter } from "@/components/DateRangeFilter";
import { useCheckIns } from "@/hooks/check-ins/useCheckIns";
import { usePrintContext } from "@/hooks/context/usePrintContext";
import VisitHistoryTable from "./VisitHitoryTable";

export default function VisitHistory() {
  const { isFetching } = useCheckIns();
  const { contentRef } = usePrintContext();

  return (
    <Stack>
      <Group justify="space-between">
        <Group>
          <SearchFilter textInputProps={{ loading: isFetching }} />
          <DateRangeFilter />
        </Group>
        <PrintButton printOptions={{ contentRef }} />
      </Group>
      <VisitHistoryTable />
    </Stack>
  );
}
