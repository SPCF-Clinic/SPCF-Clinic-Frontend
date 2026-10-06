import { Paper, Stack, Text } from "@mantine/core";
import { IconBedFilled, IconBedOff } from "@tabler/icons-react";

import { OVERDUE_COLOR } from "@/constants/colors";
import { useTimerNow } from "@/hooks/timers/useTimerNow";
import { dayjs } from "@/services/dayjs";
import type { BedIndex } from "@/types/beds";
import classes from "./Bed.module.css";

export default function Bed(bed: BedIndex) {
  const isOccupied = bed.status === "Occupied";
  const isPaused = isOccupied && bed.timer_paused_at !== null;

  // A Paused Bed Timer can never be Overdue, so only running timers tick.
  const now = useTimerNow(isOccupied && !isPaused);

  const isOverdue =
    isOccupied && !isPaused && now.isAfter(dayjs(bed.timer_expires_at));

  return (
    <Paper
      miw={110}
      px="xs"
      py="md"
      mih={110}
      data-status={isOverdue ? "overdue" : bed.status.toLowerCase()}
      className={classes.bed}
      style={isOverdue ? { "--overdue-color": OVERDUE_COLOR } : undefined}
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
