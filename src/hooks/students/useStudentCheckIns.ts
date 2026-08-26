import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { useParams } from "react-router-dom";

import { studentQueries } from "@/query/students";

export function useStudentCheckIns() {
  const { studentNumber } = useParams();
  const [search] = useQueryState("search", { defaultValue: "" });
  return useQuery({
    ...studentQueries.checkInsList(Number(studentNumber), { search }),
    enabled: !!studentNumber,
    placeholderData: keepPreviousData,
  });
}
