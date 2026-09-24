import { useState, useEffect } from 'react';
import { Stack, RingProgress, Box, Text, ActionIcon, Button, Group, useMantineTheme } from '@mantine/core';
import { IconPlayerPlay, IconPlayerPause, IconPill } from '@tabler/icons-react';
import { useDashboardAsideContext } from '@/hooks/context/useDashboardAsideContext';
import { useTimerNow } from '@/hooks/timers/useTimerNow';
import { dayjs } from '@/services/dayjs';
import formatDuration from '@/utils/formatDuration';

const OVERDUE_COLOR = '#8e2d2d';
const PRIMARY_BLUE = '#2b428b';

interface ActiveTimersModalFormProps {
  startedAt: string;
  expiresAt: string;
  pausedAt: string | null;
  patientName?: string;
  condition?: string;
  onAddMinutes?: (newExpiresAt: string) => void;
  onSubtractMinutes?: (newExpiresAt: string) => void;
  onTogglePause?: () => void;
  onGiveMedicine?: () => void;
  onUnassign?: () => void;
}

export default function ActiveTimersModalForm({
  startedAt,
  expiresAt: initialExpiresAt,
  pausedAt,
  patientName,
  condition,
  onAddMinutes,
  onSubtractMinutes,
  onTogglePause,
  onGiveMedicine,
  onUnassign,
}: ActiveTimersModalFormProps) {
  const theme = useMantineTheme();
  const { active } = useDashboardAsideContext();

  const [currentExpiresAt, setCurrentExpiresAt] = useState(initialExpiresAt);

  useEffect(() => {
    setCurrentExpiresAt(initialExpiresAt);
  }, [initialExpiresAt]);

  const isPaused = pausedAt !== null;
  const now = useTimerNow(active && !isPaused);

  // Handlers for +5 and -5 minutes
  const handleAddFiveMinutes = () => {
    const currentNow = dayjs();
    const currentExpiry = dayjs(currentExpiresAt);
    const baseTime = currentExpiry.isBefore(currentNow) ? currentNow : currentExpiry;
    const updatedExpiration = baseTime.add(5, 'minute').format('YYYY-MM-DD HH:mm:ss');

    setCurrentExpiresAt(updatedExpiration);
    onAddMinutes?.(updatedExpiration);
  };

  const handleSubtractFiveMinutes = () => {
    const currentExpiry = dayjs(currentExpiresAt);
    const updatedExpiration = currentExpiry.subtract(5, 'minute').format('YYYY-MM-DD HH:mm:ss');

    setCurrentExpiresAt(updatedExpiration);
    onSubtractMinutes?.(updatedExpiration);
  };

  // Live calculation logic
  const startedAtMs = dayjs(startedAt).valueOf();
  const expiresAtMs = dayjs(currentExpiresAt).valueOf();
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
  const accentColor = isDisplayedOverdue ? OVERDUE_COLOR : PRIMARY_BLUE;

  const totalMinutes = Math.round(totalDurationMs / (1000 * 60));
  const totalDurationLabel = `${totalMinutes} min`;

  return (
    <Stack align="center" gap="md" py="xs">
      {/* Outer Ring & Center Indicator */}
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
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 148,
            height: 148,
            borderRadius: '50%',
            backgroundColor: isPaused ? PRIMARY_BLUE : '#EEF2F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
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
                <Text fw={800} style={{ fontSize: '32px', lineHeight: 1 }} c={accentColor}>
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
        <ActionIcon
          radius="xl"
          size={48}
          variant="light"
          onClick={handleSubtractFiveMinutes}
          style={{ backgroundColor: '#EEF2F6', color: PRIMARY_BLUE }}
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
          style={{ backgroundColor: '#EEF2F6', color: PRIMARY_BLUE }}
        >
          {isPaused ? (
            <IconPlayerPlay size={24} style={{ fill: PRIMARY_BLUE }} />
          ) : (
            <IconPlayerPause size={24} style={{ fill: PRIMARY_BLUE }} />
          )}
        </ActionIcon>

        <ActionIcon
          radius="xl"
          size={48}
          variant="light"
          onClick={handleAddFiveMinutes}
          style={{ backgroundColor: '#EEF2F6', color: PRIMARY_BLUE }}
        >
          <Text fw={700} size="md">
            +5
          </Text>
        </ActionIcon>
      </Group>

      <Stack gap={2} align="center" mt="xs">
        <Text fw={700} size="lg" ta="center" c="black">
          {patientName}
        </Text>
        <Text fs="italic" c="dimmed" size="sm" ta="center">
          {condition}
        </Text>
      </Stack>

      {/* Bottom Actions: Give Medicine & Unassign */}
      <Group gap="sm" w="100%" mt="xs">
        <ActionIcon
          radius="xl"
          size={48}
          variant="light"
          onClick={onGiveMedicine}
          style={{ backgroundColor: '#EEF2F6', color: PRIMARY_BLUE }}
        >
          <IconPill size={22} />
        </ActionIcon>

        <Button
          fullWidth
          radius="xl"
          size="md"
          onClick={onUnassign}
          style={{
            flex: 1,
            backgroundColor: PRIMARY_BLUE,
            height: '48px',
            fontSize: '16px',
            fontWeight: 700,
          }}
        >
          Unassign from Bed
        </Button>
      </Group>
    </Stack>
  );
}