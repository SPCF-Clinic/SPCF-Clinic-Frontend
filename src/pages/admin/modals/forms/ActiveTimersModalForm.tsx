import { useState } from "react";
import {
  Stack,
  RingProgress,
  Box,
  Text,
  ActionIcon,
  Button,
  Group,
  Loader,
  useMantineTheme,
} from "@mantine/core";
import { IconPlayerPlay, IconPlayerPause, IconPill } from "@tabler/icons-react";
import { OVERDUE_COLOR } from "@/constants/colors";
import { useDashboardAsideContext } from "@/hooks/context/useDashboardAsideContext";
import { useTimerNow } from "@/hooks/timers/useTimerNow";
import { dayjs } from "@/services/dayjs";
import formatDuration from "@/utils/formatDuration";

export type ActiveTimerPendingAction =
  | "adjustTime"
  | "pauseTimer"
  | "resumeTimer"
  | "unassign";

interface ActiveTimersModalFormProps {
  startedAt: string;
  effectiveStartedAt?: string | null;
  expiresAt: string;
  pausedAt: string | null;
  occupantName?: string;
  reasonForVisit?: string | null;
  onAddMinutes?: (newExpiresAt: string) => void;
  onSubtractMinutes?: (newExpiresAt: string) => void;
  onTogglePause?: () => void;
  onGiveMedicine?: () => void;
  onUnassign?: () => void;
  /** Which mutation is currently in flight, if any. */
  pendingAction?: ActiveTimerPendingAction | null;
}

export default function ActiveTimersModalForm({
  startedAt,
  effectiveStartedAt,
  expiresAt: initialExpiresAt,
  pausedAt,
  occupantName,
  reasonForVisit,
  onAddMinutes,
  onSubtractMinutes,
  onTogglePause,
  onGiveMedicine,
  onUnassign,
  pendingAction = null,
}: ActiveTimersModalFormProps) {
  const theme = useMantineTheme();
  const { active } = useDashboardAsideContext();

  const circleStyle = (disabled: boolean, color: string) => ({
    backgroundColor: disabled ? theme.colors.gray[0] : "#EEF2F6",
    color: disabled ? theme.colors.gray[6] : color,
    border: `1px solid ${disabled ? theme.colors.gray[4] : "transparent"}`,
    borderStyle: disabled ? "dashed" : "solid",
    cursor: disabled ? "not-allowed" : "pointer",
  });

  const [currentExpiresAt, setCurrentExpiresAt] = useState(initialExpiresAt);
  const [prevInitialExpiresAt, setPrevInitialExpiresAt] =
    useState(initialExpiresAt);

  if (initialExpiresAt !== prevInitialExpiresAt) {
    setPrevInitialExpiresAt(initialExpiresAt);
    setCurrentExpiresAt(initialExpiresAt);
  }

  const isResumePending = pendingAction === "resumeTimer";
  const isPaused = pausedAt !== null;
  const now = useTimerNow(active && !isPaused);

  const isBusy = pendingAction !== null;

  const iconColor = isBusy ? theme.colors.gray[6] : theme.colors.primary[9];

  const handleAddFiveMinutes = () => {
    const effectiveNow = isPaused ? dayjs(pausedAt) : dayjs();
    const currentExpiry = dayjs(currentExpiresAt);
    const baseTime = currentExpiry.isBefore(effectiveNow)
      ? effectiveNow
      : currentExpiry;
    const updatedExpiration = baseTime
      .add(5, "minute")
      .format("YYYY-MM-DD HH:mm:ss");

    if (!isDisplayedOverdue) setCurrentExpiresAt(updatedExpiration);
    onAddMinutes?.(updatedExpiration);
  };

  const handleSubtractFiveMinutes = () => {
    const currentExpiry = dayjs(currentExpiresAt);
    const updatedExpiration = currentExpiry
      .subtract(5, "minute")
      .format("YYYY-MM-DD HH:mm:ss");

    setCurrentExpiresAt(updatedExpiration);
    onSubtractMinutes?.(updatedExpiration);
  };

  const startedAtMs = dayjs(effectiveStartedAt ?? startedAt).valueOf();
  const expiresAtMs = dayjs(currentExpiresAt).valueOf();
  const effectiveNowMs = isPaused ? dayjs(pausedAt).valueOf() : now.valueOf();

  const remainingMs = expiresAtMs - effectiveNowMs;
  const isOverdue = remainingMs < 0;

  const isFiveOrLess = remainingMs <= 300000;

  const displaySeconds = isOverdue
    ? Math.floor(Math.abs(remainingMs) / 1000)
    : Math.ceil(Math.max(0, remainingMs) / 1000);

  const displayTime =
    isOverdue && displaySeconds > 0
      ? `-${formatDuration(displaySeconds)}`
      : formatDuration(displaySeconds);

  const isDisplayedOverdue = isOverdue && !isPaused;
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
  const accentColor = isDisplayedOverdue
    ? OVERDUE_COLOR
    : theme.colors.primary[9];

  const totalMinutes = Math.round(totalDurationMs / (1000 * 60));
  const totalDurationLabel = `${totalMinutes} min`;

  return (
    <Stack align="center" gap="md" py="xs">
      <Box pos="relative" style={{ width: 220, height: 220 }}>
        <RingProgress
          size={220}
          thickness={18}
          roundCaps
          rootColor="#EEF2F6"
          sections={[{ value: progress, color: accentColor }]}
        />
        <Box
          pos="absolute"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 148,
            height: 148,
            borderRadius: "50%",
            backgroundColor: isPaused ? theme.colors.primary[9] : "#EEF2F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <Stack gap={0} align="center">
            {isPaused ? (
              <>
                <Text fw={700} size="xl" c="white" style={{ lineHeight: 1.1 }}>
                  Paused
                </Text>
                <Text fw={600} size="md" c="white" mt={4}>
                  {displayTime}
                </Text>
              </>
            ) : (
              <>
                <Text
                  fw={800}
                  style={{ fontSize: "32px", lineHeight: 1 }}
                  c={accentColor}
                >
                  {displayTime}
                </Text>
                <Text size="sm" c="dimmed" fw={600} mt={6}>
                  {totalDurationLabel}
                </Text>
              </>
            )}
          </Stack>
        </Box>
      </Box>

      <Group gap="md" justify="center" mt="xs">
        {!isDisplayedOverdue && (
          <>
            <ActionIcon
              radius="xl"
              size={48}
              variant="light"
              onClick={handleSubtractFiveMinutes}
              disabled={isFiveOrLess || isBusy}
              style={circleStyle(
                isFiveOrLess || isBusy,
                theme.colors.primary[9],
              )}
            >
              <Text fw={700} size="md">
                -5
              </Text>
            </ActionIcon>

            <ActionIcon
              radius="xl"
              size={52}
              variant="light"
              onClick={onTogglePause}
              disabled={isBusy}
              style={circleStyle(isBusy, theme.colors.primary[9])}
            >
              {isResumePending ? (
                <Loader size={20} color={theme.colors.primary[9]} />
              ) : isPaused ? (
                <IconPlayerPlay size={24} style={{ fill: iconColor }} />
              ) : (
                <IconPlayerPause size={24} style={{ fill: iconColor }} />
              )}
            </ActionIcon>
          </>
        )}

        <ActionIcon
          radius="xl"
          size={48}
          variant="light"
          onClick={handleAddFiveMinutes}
          disabled={isBusy}
          style={circleStyle(isBusy, accentColor)}
        >
          <Text fw={700} size="md">
            +5
          </Text>
        </ActionIcon>
      </Group>

      <Stack gap={2} align="center" mt="xs">
        <Text fw={700} size="lg" ta="center" c="black">
          {occupantName}
        </Text>
        {reasonForVisit && (
          <Text fs="italic" c="dimmed" size="sm" ta="center">
            {reasonForVisit}
          </Text>
        )}
      </Stack>

      {/* Bottom Actions: Give Medicine & Unassign */}
      <Group gap="sm" w="100%" mt="xs">
        {!isDisplayedOverdue && (
          <ActionIcon
            radius="xl"
            size={48}
            variant="light"
            onClick={onGiveMedicine}
            disabled={isBusy}
            style={circleStyle(isBusy, theme.colors.primary[9])}
          >
            <IconPill size={22} />
          </ActionIcon>
        )}

        <Button
          fullWidth
          radius="xl"
          size="md"
          onClick={onUnassign}
          loading={pendingAction === "unassign"}
          style={{
            flex: 1,
            backgroundColor: accentColor,
            height: "48px",
            fontSize: "16px",
            fontWeight: 700,
          }}
        >
          Unassign from Bed
        </Button>
      </Group>
    </Stack>
  );
}
