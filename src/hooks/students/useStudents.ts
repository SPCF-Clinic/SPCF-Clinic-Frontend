import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

import { studentQueries } from "@/query/students";
import { useAppPage } from "../useAppPage";
import { useStudentSort } from "./useStudentSort";

/** The URL-backed filters shared by the on-screen list and the print
 *  export, so both always describe the same set of students. */
export function useStudentFilters() {
  const [student_id] = useQueryState("student_id", { defaultValue: "" });
  const { sort } = useStudentSort();
  return {
    student_id: student_id || undefined,
    sort_by: sort?.by,
    sort_order: sort?.order,
  };
}

export function useStudents() {
  const filters = useStudentFilters();
  const [page] = useAppPage();
  return useQuery({
    ...studentQueries.list({ ...filters, page, per_page: 20 }),
    placeholderData: keepPreviousData,
  });
}
