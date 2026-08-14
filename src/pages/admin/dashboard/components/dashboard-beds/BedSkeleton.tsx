import { Paper, Skeleton, Stack } from "@mantine/core";

import classes from "./Bed.module.css";

export default function BedSkeleton() {
  return (
    <Paper
      px="xs"
      py="md"
      mih={110}
      data-status="empty"
      className={classes.bed}
    >
      <Stack align="center" gap={0}>
        <Skeleton height={32} circle mb={4} className={classes.skeleton} />
        <Skeleton
          bg="red"
          height={12}
          width={64}
          className={classes.skeleton}
        />
        <Skeleton height={16} mt="xs" className={classes.skeleton} />
      </Stack>
    </Paper>
  );
}
