import {
  Box,
  Button,
  Flex,
  Group,
  Paper,
  Scroller,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure, useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

import QueryError from "@/components/QueryError";
import { bedQueries } from "@/query/beds";
import Bed from "./Bed";
import BedsModal from "./BedsModal";
import BedSkeleton from "./BedSkeleton";
import ColorSwatchLegend from "./ColorSwatchLegend";

export default function DashboardBeds() {
  const [opened, { open, close }] = useDisclosure(false);

  const {
    data,
    isPending,
    error,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(bedQueries.list());
  const { ref, entry } = useIntersection({ threshold: 0.1 });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [entry?.isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (error) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  return (
    <Paper p="lg" radius="lg">
      <Stack>
        <Flex align="center" justify="space-between">
          <Text component="h2" size="xl" fw={600}>
            Bed Status
          </Text>
          <BedsModal opened={opened} onClose={close} />
          <Button variant="transparent" td="underline" onClick={open}>
            View All
          </Button>
        </Flex>

        <Stack>
          <Scroller>
            <Group wrap="nowrap" py="xs">
              {isPending ? (
                Array.from({ length: 8 }, (_, i) => (
                  <Box key={i} w={140}>
                    <BedSkeleton />
                  </Box>
                ))
              ) : (
                <>
                  {data.pages.map(({ data }, i) => (
                    <React.Fragment key={data.next_cursor ?? i}>
                      {data.data.map((bed) => (
                        <Box key={bed.id} w={140}>
                          <Bed {...bed} />
                        </Box>
                      ))}
                    </React.Fragment>
                  ))}

                  {isFetchingNextPage &&
                    Array.from({ length: 3 }, (_, i) => (
                      <Box key={`next-skeleton-${i}`} w={140}>
                        <BedSkeleton />
                      </Box>
                    ))}

                  {hasNextPage && (
                    <Box ref={ref} w={20} style={{ flexShrink: 0 }} />
                  )}
                </>
              )}
            </Group>
          </Scroller>
          <ColorSwatchLegend />
        </Stack>
      </Stack>
    </Paper>
  );
}
