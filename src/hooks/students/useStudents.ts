import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

import { studentQueries } from "@/query/students";

export function useStudents() {
	const [student_id] = useQueryState("student_id", { defaultValue: "" });
	return useQuery({
		...studentQueries.list({ student_id }),
		placeholderData: keepPreviousData,
	});
}
