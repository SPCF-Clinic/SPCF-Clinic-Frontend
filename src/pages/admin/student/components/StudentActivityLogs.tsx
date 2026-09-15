import { Paper, ScrollArea, Stack, Text } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import React, { useEffect, useState } from "react";

import Activity from "@/components/activities/Activity";
import ActivitySkeleton from "@/components/activities/ActivitySkeleton";
import QueryError from "@/components/QueryError";
import { useStudentActivityLogs } from "@/hooks/students/useStudentActivityLogs";
import { useStudentDetail } from "@/hooks/students/useStudentDetail";
import classes from "@/styles/ScrollFade.module.css";
import { getStudentFullName } from "@/utils/students/studentName";

interface StudentActivityLogsProps {
	date?: string;
	userId?: number;
	studentNumber?: number;
	withBorder?: boolean;
}

export default function StudentActivityLogs({ date, userId, studentNumber, withBorder=false }: StudentActivityLogsProps) {

	const performedFor = studentNumber
		? Number(studentNumber)
		: undefined;
console.log(performedFor, "performedFor in StudentActivityLogs")
	const {
		data: studentLogsData,
		isPending,
		error,
		refetch,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useStudentActivityLogs({ performed_by: userId, performed_for: performedFor, date: date });
	const { data: studentData } = useStudentDetail();
	const studentFullName = studentData
		? getStudentFullName(studentData.data.personal_info, true)
		: undefined;

	const [container, setContainer] = useState<HTMLDivElement | null>(null);

	const { ref, entry } = useIntersection({
		root: container,
		rootMargin: "200px",
	});

	useEffect(() => {
		if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [entry?.isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

	if (error) {
		return <QueryError error={error} onRetry={refetch} />;
	}

	if (!studentLogsData?.pages.flatMap((page) => page.data.data).length) {
		return null;
	}

	return (
		<Paper p="lg" radius="lg" withBorder={withBorder}>
			<Stack>
				<Text fw={600} size="sm" tt="uppercase" c="primary">
					Activity Log
				</Text>

				<ScrollArea
					viewportRef={setContainer}
					offsetScrollbars
					classNames={{ viewport: classes.scrollFadeY }}
					h={280}
				>
					<Stack gap="sm">
						{isPending ? (
							Array.from({ length: 5 }).map((_, i) => (
								<ActivitySkeleton key={`initial-skeleton-${i}`} />
							))
						) : (
							<>
								{studentLogsData.pages.map((page, i) => (
									<React.Fragment key={page.data.next_cursor || i}>
										{page.data.data.map((activity) => (
											<Activity
												key={activity.id}
												action={activity.action}
												date={activity.created_at}
												highlightAction={studentFullName}
											/>
										))}
									</React.Fragment>
								))}

								{(hasNextPage || isFetchingNextPage) &&
									Array.from({ length: 3 }).map((_, i) => (
										<ActivitySkeleton key={`next-page-skeleton-${i}`} />
									))}

								{hasNextPage && !isFetchingNextPage && <div ref={ref}></div>}
							</>
						)}
					</Stack>
				</ScrollArea>
			</Stack>
		</Paper>
	);
}
