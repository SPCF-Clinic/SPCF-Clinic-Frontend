import { Breadcrumbs, Group, Stack, Text } from "@mantine/core";
import { useRef } from "react";

import AppPager from "@/components/AppPager";
import { PrintButton } from "@/components/PrintButton";
import { SearchFilter } from "@/components/SearchFilter";
import { DateRangeFilter } from "@/components/DateRangeFilter";
import { useCheckIns } from "@/hooks/check-ins/useCheckIns";
import { useAppPage } from "@/hooks/useAppPage";
import VisitHistoryTable from "./VisitHitoryTable";

export default function VisitHistory() {
  const { data, isFetching } = useCheckIns();
  const [page, setPage] = useAppPage();

  const contentRef = useRef<HTMLDivElement>(null);
  const totalPages = data?.data.pagination.total_pages ?? 1;

  const handleCommit = () => {
    if (page !== 1) setPage(1);
  };

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
          <SearchFilter
            textInputProps={{ loading: isFetching }}
            onCommit={handleCommit}
          />
          <DateRangeFilter onCommit={handleCommit} />
        </Group>
        <PrintButton printOptions={{ contentRef }} />
      </Group>
      <VisitHistoryTable />
      {totalPages > 1 && (
        <AppPager page={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </Stack>
  );
}
