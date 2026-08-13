import { Box, ScrollArea, Stack, Text } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

import QueryError from "@/components/QueryError";
import { activityLogQueries } from "@/query/activity-logs";
import classes from "@/styles/ScrollFade.module.css";
import Activity from "./Activity";
import ActivitySkeleton from "./ActivitySkeleton";

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
  } = useInfiniteQuery(activityLogQueries.list({ per_page: 7 }));

  const { ref, entry } = useIntersection({
    root: container,
    rootMargin: "0px 0px 150px 0px",
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
      console.log("fetching");
    }
  }, [entry?.isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

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
                      />
                    ))}
                  </React.Fragment>
                ))}

                {isFetchingNextPage &&
                  Array.from({ length: 3 }).map((_, i) => (
                    <ActivitySkeleton key={`next-page-skeleton-${i}`} />
                  ))}

                {hasNextPage && <Box ref={ref} h={1} />}
              </>
            )}
          </Stack>
        </ScrollArea>
      </Stack>
    </Box>
  );
}
