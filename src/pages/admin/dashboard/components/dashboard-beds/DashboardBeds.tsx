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
import React, { useEffect, useState } from "react";

import QueryError from "@/components/QueryError";
import { bedQueries } from "@/query/beds";
import AssignBedModal from "./AssignBedModal";
import BedSkeleton from "./BedSkeleton";
import BedsModal from "./BedsModal";
import BedTile from "./BedTile";
import ColorSwatchLegend from "./ColorSwatchLegend";
import { useAssignBedModal } from "./useAssignBedModal";

export default function DashboardBeds() {
  const [opened, { open, close }] = useDisclosure(false);

  const { openAssignBed, assignBedModalProps } = useAssignBedModal();

  const {
    data,
    isPending,
    error,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(bedQueries.list());
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const { ref, entry } = useIntersection({
    root: container,
    scrollMargin: "350px",
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [entry?.isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (error) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  return (
    <>
      <Paper p="lg" radius="lg">
        <Stack>
          <Flex align="center" justify="space-between">
            <Text component="h2" size="xl" fw={600}>
              Bed Status
            </Text>
            <Button variant="transparent" td="underline" onClick={open}>
              View All
            </Button>
          </Flex>

          <Stack>
            <Scroller ref={setContainer}>
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
                          <BedTile
                            key={bed.id}
                            bed={bed}
                            openAssignBed={openAssignBed}
                            w={140}
                          />
                        ))}
                      </React.Fragment>
                    ))}

                    {(hasNextPage || isFetchingNextPage) &&
                      Array.from({ length: 3 }, (_, i) => (
                        <Box key={`next-skeleton-${i}`} w={140}>
                          <BedSkeleton />
                        </Box>
                      ))}

                    {hasNextPage && !isFetchingNextPage && <Box ref={ref} />}
                  </>
                )}
              </Group>
            </Scroller>
            <ColorSwatchLegend />
          </Stack>
        </Stack>
      </Paper>

      <BedsModal opened={opened} onClose={close} />
      <AssignBedModal {...assignBedModalProps} />
    </>
  );
}
