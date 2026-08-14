import { Box, Divider, Grid, Modal, type ModalProps } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

import QueryError from "@/components/QueryError";
import { bedQueries } from "@/query/beds";
import Bed from "./Bed";
import BedSkeleton from "./BedSkeleton";
import ColorSwatchLegend from "./ColorSwatchLegend";
import { useIntersection } from "@mantine/hooks";

export default function BedsModal(props: ModalProps) {
  const {
    data,
    isPending,
    error,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(bedQueries.list());

  const { ref, entry } = useIntersection({
    threshold: 0.1,
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
      console.log("fetching next page");
    }
  }, [entry?.isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (error) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  return (
    <Modal.Root size="xl" centered {...props}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title fz={20} fw={600}>
            Bed Status
          </Modal.Title>
          <Modal.CloseButton
            icon={<IconX color="var(--mantine-color-text)" stroke={2.5} />}
          />
        </Modal.Header>
        <Divider />
        <Modal.Body py="md">
          <Grid columns={5} justify="space-between" gap="md">
            {isPending
              ? Array.from({ length: 20 }, (_, i) => (
                  <Grid.Col span={{ base: 3, xs: 2, sm: 1 }} key={i}>
                    <BedSkeleton />
                  </Grid.Col>
                ))
              : data.pages.map(({ data }, i) => (
                  <React.Fragment key={data.next_cursor ?? i}>
                    {data.data.map((bed) => (
                      <Grid.Col span={{ base: 3, xs: 2, sm: 1 }} key={bed.id}>
                        <Bed {...bed} />
                      </Grid.Col>
                    ))}
                  </React.Fragment>
                ))}

            {isFetchingNextPage &&
              Array.from({ length: 10 }, (_, i) => (
                <Grid.Col
                  span={{ base: 3, xs: 2, sm: 1 }}
                  key={`skeleton-next-${i}`}
                >
                  <BedSkeleton />
                </Grid.Col>
              ))}
          </Grid>
          <Box ref={ref} />
        </Modal.Body>
        <Box
          py="sm"
          px="md"
          bg="var(--mantine-color-body)"
          style={{
            position: "sticky",
            bottom: 0,
            zIndex: 10,
            borderTop: "1px solid var(--mantine-color-default-border)",
          }}
        >
          <ColorSwatchLegend />
        </Box>
      </Modal.Content>
    </Modal.Root>
  );
}
