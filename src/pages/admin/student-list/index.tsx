import { Group, Paper, Stack, Text } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";

import AppPager from "@/components/AppPager";
import { PrintButton } from "@/components/PrintButton";
import { SearchFilter } from "@/components/SearchFilter";
import { useStudentFilters, useStudents } from "@/hooks/students/useStudents";
import { useStudentSort } from "@/hooks/students/useStudentSort";
import { useAppPage } from "@/hooks/useAppPage";
import { studentQueries } from "@/query/students";
import type { StudentIndex } from "@/types/students";
import { showToastError } from "@/utils/toastError";
import StudentTable from "./components/student-table/StudentTable";

export default function StudentList() {
  const { data, isFetching, isPending, error, refetch } = useStudents();
  const [page, setPage] = useAppPage();
  const filters = useStudentFilters();
  const { sort, setSort } = useStudentSort();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const contentRef = useRef<HTMLDivElement>(null);
  const [printStudents, setPrintStudents] = useState<StudentIndex[]>();
  const [isPreparingPrint, setIsPreparingPrint] = useState(false);

  const totalPages = data?.data.pagination?.total_pages ?? 1;

  const handleCommit = () => {
    // The hidden print table belongs to the filters it was fetched with,
    // so drop it rather than let a stale filter set reach the printer.
    setPrintStudents(undefined);
    if (page !== 1) setPage(1);
  };

  /** Printing covers every student that matches the filters, not just the
   *  current page: omitting `per_page` makes the endpoint return them all
   *  unpaginated. The rows are committed synchronously so the print
   *  snapshot includes the full table. */
  const fetchAllForPrint = async () => {
    setIsPreparingPrint(true);
    try {
      const result = await queryClient.fetchQuery(studentQueries.list(filters));
      flushSync(() => setPrintStudents(result.data.students));
    } finally {
      setIsPreparingPrint(false);
    }
  };

  return (
    <Paper flex={1} p="lg" radius="lg" withBorder>
      <Stack ref={contentRef}>
        <Text component="h2" fw="bold" size="xl">
          List of Students{" "}
          {printStudents
            ? `(${printStudents.length})`
            : data
              ? `(${data.data.pagination?.total})`
              : ""}
        </Text>
        <Group justify="space-between">
          <SearchFilter
            queryKey="student_id"
            textInputProps={{
              placeholder: "Search Student",
              loading: isFetching,
            }}
            onCommit={handleCommit}
          />
          <PrintButton
            loading={isPreparingPrint}
            printOptions={{
              contentRef,
              documentTitle: () =>
                `Student List${filters.student_id ? ` (${filters.student_id})` : ""}`,
              onBeforePrint: fetchAllForPrint,
              onAfterPrint: () => setPrintStudents(undefined),
              onPrintError: (location, printError) => {
                if (location !== "onBeforePrint") return;
                showToastError(printError);
              },
            }}
          />
        </Group>
        <div className="no-print">
          <StudentTable
            students={data?.data.students}
            isPending={isPending}
            isFetching={isFetching}
            error={error}
            onRetry={refetch}
            sort={{
              key: sort?.by ?? null,
              order: sort?.order ?? null,
              onSortChange: setSort,
            }}
            onRowClick={(student) => navigate(`/admin/students/${student.id}`)}
            showActions
          />
        </div>
        {totalPages > 1 && (
          <AppPager page={page} totalPages={totalPages} onPageChange={setPage} />
        )}
        <Stack className="print-only">
          <StudentTable students={printStudents} />
        </Stack>
      </Stack>
    </Paper>
  );
}
