import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

import { studentQueries } from "@/query/students";
import { useStudentPage } from "./useStudentPage";

export function useStudents() {
  const [student_id] = useQueryState("student_id", { defaultValue: "" });
  const [page] = useStudentPage();
  return useQuery({
    ...studentQueries.list({ student_id, page }),
    placeholderData: keepPreviousData,
  });
}
