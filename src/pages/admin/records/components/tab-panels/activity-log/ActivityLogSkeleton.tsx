import { Divider, Skeleton, Stack, Timeline } from "@mantine/core";

import classes from "./ActivityLogItem.module.css";

export default function ActivityLogSkeleton() {
	return (
		<Stack>
			<Divider
				label={<Skeleton height={19} width={90} />}
				labelPosition="center"
			/>

			<Timeline
				bulletSize={8}
				lineWidth={2}
				classNames={{
					item: classes.item,
					itemBullet: `${classes.itemBullet} ${classes.itemBulletSkeleton}`,
					itemBody: classes.itemBody,
					itemTitle: classes.itemTitle,
				}}
			>
				{Array.from({ length: 3 }).map((_, i) => (
					<Timeline.Item key={i} title={<Skeleton height={12} width={55} />}>
						<Stack gap="xs">
							<Skeleton height={48.8} radius="md" />
							{i % 2 === 0 && <Skeleton height={48.8} radius="md" />}
						</Stack>
					</Timeline.Item>
				))}
			</Timeline>
		</Stack>
	);
}
