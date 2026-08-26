import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { activityLogQueries } from "@/query/activity-logs";

export function useStudentActivityLogs() {
	const { studentNumber } = useParams();
	return useInfiniteQuery({
		...activityLogQueries.list({
			performed_by: Number(studentNumber),
		}),
		enabled: !!studentNumber,
	});
}
