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
								<Paper
									key={log.id}
									p="sm"
									bg="rgba(237, 240, 246, 1)"
									style={{
										borderLeft: "3px solid var(--mantine-color-primary-8)",
									}}
								>
									<Text>{log.action}</Text>
								</Paper>
							))}
						</Stack>
					</Timeline.Item>
				))}
			</Timeline>
		</Stack>
	);
}
