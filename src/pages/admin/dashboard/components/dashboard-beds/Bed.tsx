import { Paper, Stack, Text } from "@mantine/core";
import { IconBedFilled, IconBedOff } from "@tabler/icons-react";

import type { BedIndex } from "@/types/beds";
import classes from "./Bed.module.css";

export default function Bed(bed: BedIndex) {
  return (
    <Paper
      miw={110}
      px="xs"
      py="md"
      mih={110}
      data-status={bed.status.toLowerCase()}
      className={classes.bed}
    >
      <Stack align="center" gap={0}>
        {bed.status === "Empty" ? (
          <IconBedOff size={32} className={classes.icon} />
        ) : (
          <IconBedFilled size={32} className={classes.icon} />
        )}
        <Text size="xs" className={classes.text}>
          {bed.bed_number}
        </Text>
        <Text fw={600} className={classes.text} truncate w="100%" ta="center">
          {bed.status !== "Empty"
            ? bed.current_occupant.occupant_name
            : bed.status}
        </Text>
      </Stack>
    </Paper>
  );
}
