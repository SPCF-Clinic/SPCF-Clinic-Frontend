import { Breadcrumbs, Group, Stack, Text } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";

import AppPager from "@/components/AppPager";
import { PrintButton } from "@/components/PrintButton";
import { SearchFilter } from "@/components/SearchFilter";
import { DateRangeFilter } from "@/components/DateRangeFilter";
import { useCheckInFilters, useCheckIns } from "@/hooks/check-ins/useCheckIns";
import { useAppPage } from "@/hooks/useAppPage";
import { checkInQueries } from "@/query/check-ins";
import type { CheckInIndex } from "@/types/check-ins";
import { showToastError } from "@/utils/toastError";
import VisitHistoryTable from "./VisitHitoryTable";

export default function VisitHistory() {
  const { data, isFetching, isPending, error, refetch } = useCheckIns();
  const [page, setPage] = useAppPage();
  const filters = useCheckInFilters();
  const queryClient = useQueryClient();

  const contentRef = useRef<HTMLDivElement>(null);
  const [printCheckIns, setPrintCheckIns] = useState<CheckInIndex[]>();
  const [isPreparingPrint, setIsPreparingPrint] = useState(false);

  const totalPages = data?.data.pagination?.total_pages ?? 1;

  const handleCommit = () => {
    // The hidden print table belongs to the filters it was fetched with,
    // so drop it rather than let a stale filter set reach the printer.
    setPrintCheckIns(undefined);
    if (page !== 1) setPage(1);
  };

  /** Printing covers every record that matches the filters, not just the
   *  current page: omitting `per_page` makes the endpoint return them all
   *  unpaginated. The rows are committed synchronously so the print
   *  snapshot includes the full table. */
  const fetchAllForPrint = async () => {
    setIsPreparingPrint(true);
    try {
      const result = await queryClient.fetchQuery({
        ...checkInQueries.list(filters),
        retry: 0,
      });
      flushSync(() => setPrintCheckIns(result.data.check_ins));
    } finally {
      setIsPreparingPrint(false);
    }
  };

  return (
    <Stack ref={contentRef}>
      <Group className="print-only">
        <Breadcrumbs>
          {[
            { title: "Records" },
            {
              title: `Visit History${printCheckIns ? ` (${printCheckIns.length})` : ""}`,
            },
          ].map((item, i) => (
            <Text fw={600} key={i}>
              {item.title}
            </Text>
          ))}
        </Breadcrumbs>
      </Group>
      <Group justify="space-between">
        <Group>
          <SearchFilter textInputProps={{ loading: isFetching }} onCommit={handleCommit} />
          <DateRangeFilter onCommit={handleCommit} />
        </Group>
        <PrintButton
          loading={isPreparingPrint}
          printOptions={{
            contentRef,
            onBeforePrint: fetchAllForPrint,
            onAfterPrint: () => setPrintCheckIns(undefined),
            onPrintError: (location, printError) => {
              if (location !== "onBeforePrint") return;
              showToastError(printError);
            },
          }}
        />
      </Group>
      <div className="no-print">
        <VisitHistoryTable
          checkIns={data?.data.check_ins}
          isPending={isPending}
          error={error}
          onRetry={refetch}
        />
      </div>
      {totalPages > 1 && <AppPager page={page} totalPages={totalPages} onPageChange={setPage} />}
      <Stack className="print-only">
        <VisitHistoryTable checkIns={printCheckIns} />
      </Stack>
    </Stack>
  );
}
