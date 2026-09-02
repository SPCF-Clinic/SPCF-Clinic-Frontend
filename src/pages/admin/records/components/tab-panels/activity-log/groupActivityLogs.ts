import { dayjs } from "@/services/dayjs";
import type { ActivityLogIndex } from "@/types/activity-logs";

export const groupActivityLogs = (logs: ActivityLogIndex[]) => {
	const sortedLogs = [...logs].sort(
		(a, b) => dayjs(b.created_at).valueOf() - dayjs(a.created_at).valueOf(),
	);

	const days = new Map<
		string,
		{
			date: dayjs.Dayjs;
			times: Map<string, ActivityLogIndex[]>;
		}
	>();

	for (const log of sortedLogs) {
		const date = dayjs(log.created_at);

		const dateKey = date.format("YYYY-MM-DD");
		const timeKey = date.format("HH:mm");

		if (!days.has(dateKey)) {
			days.set(dateKey, {
				date,
				times: new Map(),
			});
		}

		const day = days.get(dateKey);

		if (!day?.times.has(timeKey)) {
			day?.times.set(timeKey, []);
		}

		day?.times.get(timeKey)?.push(log);
	}

	return Array.from(days.values()).map((day) => ({
		date: day.date.format("YYYY-MM-DD"),
		label: day.date.isSame(dayjs(), "day")
			? "Today"
			: day.date.format("ddd, DD MMMM YYYY"),
		groups: Array.from(day.times.entries()).map(([time, logs]) => ({
			time: dayjs(`${day.date.format("YYYY-MM-DD")} ${time}`).format("h:mm a"),
			logs,
		})),
	}));
};
