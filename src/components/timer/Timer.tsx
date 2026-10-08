import {
  Center,
  Group,
  Paper,
  RingProgress,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconPlayerPlayFilled } from "@tabler/icons-react";

import { OVERDUE_COLOR } from "@/constants/colors";
import { useTimerNow } from "@/hooks/timers/useTimerNow";
import { dayjs } from "@/services/dayjs";
import classes from "./Timer.module.css";
import formatDuration from "@/utils/formatDuration";

interface TimerProps {
  occupantName: string;
  bedNumber: string;
  startedAt: string;
  effectiveStartedAt?: string | null;
  expiresAt: string;
  pausedAt: string | null;
  active?: boolean;
  onClick?: () => void;
}

export default function Timer({
  occupantName,
  bedNumber,
  startedAt,
  effectiveStartedAt,
  expiresAt,
  pausedAt,
  active = true,
  onClick,
}: TimerProps) {
  const theme = useMantineTheme();

  const isPaused = pausedAt !== null;
  const now = useTimerNow(active && !isPaused);

  const startedAtMs = dayjs(effectiveStartedAt ?? startedAt).valueOf();
  const expiresAtMs = dayjs(expiresAt).valueOf();

  const effectiveNowMs = isPaused ? dayjs(pausedAt).valueOf() : now.valueOf();

  const remainingMs = expiresAtMs - effectiveNowMs;
  const isOverdue = remainingMs < 0;

  const displaySeconds = isOverdue
    ? Math.floor(Math.abs(remainingMs) / 1000)
    : Math.ceil(Math.max(0, remainingMs) / 1000);

  const displayTime =
    isOverdue && displaySeconds > 0
      ? `-${formatDuration(displaySeconds)}`
      : formatDuration(displaySeconds);

  const isDisplayedOverdue = isOverdue && displaySeconds > 0;

  const totalDurationMs = Math.max(1, expiresAtMs - startedAtMs);

  const elapsedMs = Math.min(
    totalDurationMs,
    Math.max(0, effectiveNowMs - startedAtMs),
  );

  const rawProgress = Math.min(
    100,
    Math.max(0, (elapsedMs / totalDurationMs) * 100),
  );
  const progress = Math.round(rawProgress * 10) / 10;

  const accentColor =
    isDisplayedOverdue && !isPaused ? OVERDUE_COLOR : theme.colors.primary[9];

  return (
    <Paper
      component="button"
      type="button"
      onClick={onClick}
      withBorder
      px="md"
      py={4}
      radius="lg"
      pos="relative"
      data-overdue={isDisplayedOverdue && !isPaused ? true : undefined}
      classNames={{ root: classes.timer }}
      style={{
        "--accent-color": accentColor,
      }}
    >
      <Group>
        <Stack gap={2} flex={1} align="flex-start">
          <Text size="sm" c="dimmed">
            {bedNumber}
          </Text>

          <Text fw={600}>{occupantName}</Text>
        </Stack>

        <RingProgress
          label={
            isPaused ? (
              <Center>
                <IconPlayerPlayFilled
                  size={24}
                  stroke={1.5}
                  color={theme.colors.primary[9]}
                />
              </Center>
            ) : (
              <Text
                fw={600}
                size="xs"
                ta="center"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {displayTime}
              </Text>
            )
          }
          size={80}
          thickness={7}
          roundCaps
          sections={[
            {
              value: progress,
              color: accentColor,
            },
          ]}
        />
      </Group>
    </Paper>
  );
}
