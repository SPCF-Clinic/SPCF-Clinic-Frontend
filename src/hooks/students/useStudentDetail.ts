import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { studentQueries } from "@/query/students";

export function useStudentDetail() {
  const { studentNumber } = useParams();

  return useQuery({
    ...studentQueries.detail(Number(studentNumber)),
    enabled: !!studentNumber,
  });
}
