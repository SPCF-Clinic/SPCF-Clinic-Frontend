import { Breadcrumbs, Group, Stack, Text } from "@mantine/core";
import { useRef } from "react";

import { PrintButton } from "@/components/PrintButton";
import { SearchFilter } from "@/components/SearchFilter";
import { DateRangeFilter } from "@/components/DateRangeFilter";
import { useCheckIns } from "@/hooks/check-ins/useCheckIns";
import VisitHistoryTable from "./VisitHitoryTable";

export default function VisitHistory() {
  const { isFetching } = useCheckIns();
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <Stack ref={contentRef}>
      <Group className="print-only">
        <Breadcrumbs>
          {[{ title: "Records" }, { title: "Visit History" }].map((item, i) => (
            <Text fw={600} key={i}>
              {item.title}
            </Text>
          ))}
        </Breadcrumbs>
      </Group>
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
