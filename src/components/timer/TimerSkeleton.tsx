import { Group, Paper, RingProgress, Skeleton, Stack } from "@mantine/core";

import classes from "./Timer.module.css";

export default function TimerSkeleton() {
	return (
		<Paper
			data-loading
			component="button"
			type="button"
			onClick={() => console.log("clicked")}
			withBorder
			px="md"
			py={4}
			radius="lg"
			pos="relative"
			classNames={{ root: classes.timer }}
			mih={102}
		>
			<Group>
				<Stack gap="xs" flex={1} align="flex-start">
					<Skeleton height={18} w={64} />
					<Skeleton height={20} />
				</Stack>
				<RingProgress
					size={80}
					thickness={7}
					roundCaps
					sections={[{ value: 0, color: "gray.2" }]}
				/>
			</Group>
		</Paper>
	);
}
