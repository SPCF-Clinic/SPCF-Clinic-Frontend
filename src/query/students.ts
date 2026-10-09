import { queryOptions } from "@tanstack/react-query";
import type { InvalidateQueryFilters } from "@tanstack/react-query";

import {
  type GetStudentCheckInsFilters,
  type GetStudentsFilters,
  getStudent,
  getStudentCheckIns,
  getStudents,
} from "@/api/students";

export const studentQueries = {
  all: () => ["students"],
  lists: () => [...studentQueries.all(), "list"],
  list: (filters?: GetStudentsFilters) =>
    queryOptions({
      queryKey: [...studentQueries.lists(), filters],
      queryFn: () => getStudents(filters),
    }),
  details: () => [...studentQueries.all(), "detail"],
  detail: (id: number) =>
    queryOptions({
      queryKey: [...studentQueries.details(), id],
      queryFn: () => getStudent(id),
    }),
  checkIns: (studentId: number) => [
    ...studentQueries.details(),
    studentId,
    "check-ins",
  ],
  checkInsList: (studentId: number, filters?: GetStudentCheckInsFilters) =>
    queryOptions({
      queryKey: [...studentQueries.checkIns(studentId), filters],
      queryFn: () => getStudentCheckIns(studentId, filters),
    }),
  /** `details()` is a prefix, so this matches detail queries only and not
   *  the Check-in lists nested beneath them. */
  detailsOnly: (): InvalidateQueryFilters => ({
    queryKey: studentQueries.details(),
    predicate: (query) =>
      query.queryKey.length === studentQueries.details().length + 1,
  }),
};
