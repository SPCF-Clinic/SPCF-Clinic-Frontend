import { Box, ScrollArea, Stack, Text } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

import Activity from "@/components/activities/Activity";
import ActivitySkeleton from "@/components/activities/ActivitySkeleton";
import QueryError from "@/components/QueryError";
import { useActivityLogsRealtime } from "@/hooks/activity-logs/useActivityLogsRealtime";
import { activityLogQueries } from "@/query/activity-logs";
import classes from "@/styles/ScrollFade.module.css";

export default function ActivityLogs() {
	const [container, setContainer] = useState<HTMLDivElement | null>(null);

	const {
		data,
		isPending,
		error,
		refetch,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery(activityLogQueries.list());

	const { ref, entry } = useIntersection({
		root: container,
		rootMargin: "200px",
	});

	useEffect(() => {
		if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [entry?.isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

	useActivityLogsRealtime(activityLogQueries.list().queryKey);

	if (error) {
		return <QueryError error={error} onRetry={refetch} />;
	}

	return (
		<Box>
			<Stack>
				<Text size="xl" fw={600}>
					Activity Log
				</Text>

				<ScrollArea
					viewportRef={setContainer}
					offsetScrollbars
					classNames={{ viewport: classes.scrollFadeY }}
					h={400}
				>
					<Stack gap="sm">
						{isPending ? (
							Array.from({ length: 5 }).map((_, i) => (
								<ActivitySkeleton key={`initial-skeleton-${i}`} />
							))
						) : (
							<>
								{data.pages.map((page, i) => (
									<React.Fragment key={page.data.next_cursor || i}>
										{page.data.data.map((activity) => (
											<Activity
												key={activity.id}
												action={activity.action}
												date={activity.created_at}
												highlightAction={activity.user}
											/>
										))}
									</React.Fragment>
								))}

								{(hasNextPage || isFetchingNextPage) &&
									Array.from({ length: 3 }).map((_, i) => (
										<ActivitySkeleton key={`next-page-skeleton-${i}`} />
									))}

								{hasNextPage && !isFetchingNextPage && <Box ref={ref} />}
							</>
						)}
					</Stack>
				</ScrollArea>
			</Stack>
		</Box>
	);
}
