import type { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

import { dayjs } from "@/services/dayjs";

export function useTimerNow(active: boolean): Dayjs {
	const [now, setNow] = useState(() => dayjs());

	useEffect(() => {
		if (!active) {
			return;
		}

		let timeoutId: ReturnType<typeof setTimeout>;

		const tick = () => {
			const current = dayjs();

			setNow(current);

			const delay = 1000 - current.millisecond();

			timeoutId = setTimeout(tick, delay);
		};

		tick();

		return () => {
			clearTimeout(timeoutId);
		};
	}, [active]);

	return now;
}
