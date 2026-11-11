import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

import { studentQueries } from "@/query/students";
import { useAppPage } from "../useAppPage";
import { useStudentSort } from "./useStudentSort";

export function useStudents() {
  const [student_id] = useQueryState("student_id", { defaultValue: "" });
  const [page] = useAppPage();
  const { sort } = useStudentSort();
  return useQuery({
    ...studentQueries.list({
      student_id,
      page,
      sort_by: sort?.by,
      sort_order: sort?.order,
    }),
    placeholderData: keepPreviousData,
  });
}
