import { getStudents, type GetStudentsFilters } from "@/api/students";
import { queryOptions } from "@tanstack/react-query";

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
      // queryFn: () => getStudent(id),
    }),
};
