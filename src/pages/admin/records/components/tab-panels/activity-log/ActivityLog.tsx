import { Stack } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

import QueryError from "@/components/QueryError";
import { activityLogQueries } from "@/query/activity-logs";
import ActivityLogItem from "./ActivityLogItem";
import ActivityLogSkeleton from "./ActivityLogSkeleton";
import { groupActivityLogs } from "./groupActivityLogs";

export default function ActivityLog() {
	const {
		data,
		isPending,
		error,
		refetch,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery(activityLogQueries.list({ per_page: 14 }));

	const { ref, entry } = useIntersection({
		rootMargin: "200px",
	});

	useEffect(() => {
		if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [entry?.isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

	const groupedLogs = useMemo(() => {
		const logs = data?.pages.flatMap((page) => page.data.data) ?? [];
		return groupActivityLogs(logs);
	}, [data]);

	if (error) {
		return <QueryError error={error} onRetry={refetch} />;
	}

	return (
		<Stack gap="xl" px={64}>
			{isPending
				? Array.from({ length: 3 }).map((_, i) => (
						<ActivityLogSkeleton key={i} />
					))
				: groupedLogs.map((day) => <ActivityLogItem key={day.date} {...day} />)}

			{(hasNextPage || isFetchingNextPage) && <ActivityLogSkeleton />}
			{hasNextPage && !isFetchingNextPage && <div ref={ref}></div>}
		</Stack>
	);
}
