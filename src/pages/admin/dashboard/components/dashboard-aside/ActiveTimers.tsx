import { Box, ScrollArea, Stack, Text } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

import QueryError from "@/components/QueryError";
import Timer from "@/components/timer/Timer";
import TimerSkeleton from "@/components/timer/TimerSkeleton";
import { useDashboardAsideContext } from "@/hooks/context/useDashboardAsideContext";
import { useTimerRealtime } from "@/hooks/timers/useTimerRealtime";
import { bedQueries } from "@/query/beds";
import classes from "@/styles/ScrollFade.module.css";
import StatusModal from "@/pages/admin/modals/StatusModal";

export default function ActiveTimers() {
  const {
    data,
    isPending,
    error,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    fetchNextPage,
  } = useInfiniteQuery({
    ...bedQueries.list({ status: "Occupied" }),
    staleTime: Infinity,
  });

  const { active } = useDashboardAsideContext();

  console.log("bed", data);

  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const { ref, entry } = useIntersection({
    root: container,
    scrollMargin: "350px",
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      console.log("fetching");
      fetchNextPage();
    }
  }, [entry?.isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useTimerRealtime();

  if (error) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (data?.pages[0].data.data.length === 0) return;

  return (
    <Box>
      <Stack gap="sm">
        <Text size="xl" fw={600}>
          Active Timers
        </Text>

        <ScrollArea.Autosize
          viewportRef={setContainer}
          offsetScrollbars
          classNames={{ viewport: classes.scrollFadeY }}
          mah={342}
        >
          <Stack gap="sm">
            {isPending ? (
              Array.from({ length: 3 }).map((_, i) => (
                <TimerSkeleton key={`initial-skeleton-${i}`} />
              ))
            ) : (
              <>
                {data.pages.map((page, i) => (
                  <React.Fragment key={page.data.next_cursor || i}>
                    {page.data.data.map((bed) => (
                      <Timer
                        key={bed.id}
                        bedNumber={bed.bed_number}
                        startedAt={bed.timer_started_at}
                        effectiveStartedAt={bed.effective_started_at}
                        expiresAt={bed.timer_expires_at}
                        occupantName={bed.current_occupant.occupant_name}
                        pausedAt={bed.timer_paused_at}
                        active={active}
                        onClick={() => {
                          StatusModal.ActiveTimer(bed);
                        }}
                      />
                    ))}
                  </React.Fragment>
                ))}

                {(hasNextPage || isFetchingNextPage) &&
                  Array.from({ length: 3 }).map((_, i) => (
                    <TimerSkeleton key={`next-page-skeleton-${i}`} />
                  ))}

                {hasNextPage && !isFetchingNextPage && <Box ref={ref} />}
              </>
            )}
          </Stack>
        </ScrollArea.Autosize>
      </Stack>
    </Box>
  );
}
