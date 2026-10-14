import { Divider, Paper, Stack, Text, Timeline } from "@mantine/core";
import type { ActivityLogIndex } from "@/types/activity-logs";

import classes from "./ActivityLogItem.module.css";

interface ActivityLogItemProps {
  date: string;
  label: string;
  groups: {
    time: string;
    logs: ActivityLogIndex[];
  }[];
}

export default function ActivityLogItem({
  date,
  label,
  groups,
}: ActivityLogItemProps) {
  return (
    <Stack>
      <Divider label={label} labelPosition="center" tt="uppercase" />

      <Timeline
        classNames={{
          item: classes.item,
          itemBullet: classes.itemBullet,
          itemBody: classes.itemBody,
          itemTitle: classes.itemTitle,
        }}
        bulletSize={8}
        lineWidth={2}
      >
        {groups.map((group) => (
          <Timeline.Item key={`${date}-${group.time}`} title={group.time}>
            <Stack>
              {group.logs.map((log) => (
                <ActivityLogEntry
                  key={log.id}
                  action={log.action}
                  user={log.user}
                />
              ))}
            </Stack>
          </Timeline.Item>
        ))}
      </Timeline>
    </Stack>
  );
}

function ActivityLogEntry({ action, user }: { action: string; user: string }) {
  const highlightIndex = user ? action.indexOf(user) : -1;
  const highlight = highlightIndex !== -1 ? user : undefined;

  return (
    <Paper
      p="sm"
      bg="rgba(237, 240, 246, 1)"
      style={{
        borderLeft: "3px solid var(--mantine-color-primary-8)",
      }}
    >
      <Text>
        {highlight ? (
          <>
            {action.slice(0, highlightIndex)}
            <Text component="span" c="primary" fw={600}>
              {highlight}
            </Text>
            {action.slice(highlightIndex + highlight.length)}
          </>
        ) : (
          action
        )}
      </Text>
    </Paper>
  );
}
