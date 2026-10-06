import { useQueryClient } from "@tanstack/react-query";

import { bedQueries } from "@/query/beds";
import { studentQueries } from "@/query/students";
import { useAuthStore } from "@/stores/useAuthStore";
import { usePusherChannel } from "../pusher/usePusherChannel";

export function useTimerRealtime() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	const queryClient = useQueryClient();

	/**
	 * Bed Timer changes land here and nowhere else, so this is also the single
	 * place the student detail queries are invalidated. The profile page mounts
	 * this subscription, and putting the invalidation in the pause, resume,
	 * adjust and unassign hooks instead would only cover changes made through
	 * those hooks, leaving a colleague's change on another screen invisible.
	 */
	const invalidateTimerQueries = () => {
		queryClient.invalidateQueries({
			queryKey: bedQueries.list({ status: "Occupied" }).queryKey,
		});

		queryClient.invalidateQueries({
			queryKey: studentQueries.details(),
		});
	};

	usePusherChannel(
		"private-beds",
		"timer.started",
		invalidateTimerQueries,
		isAuthenticated,
	);
	usePusherChannel(
		"private-beds",
		"timer.paused",
		invalidateTimerQueries,
		isAuthenticated,
	);
	usePusherChannel(
		"private-beds",
		"timer.resumed",
		invalidateTimerQueries,
		isAuthenticated,
	);
	usePusherChannel(
		"private-beds",
		"timer.adjusted",
		invalidateTimerQueries,
		isAuthenticated,
	);
	usePusherChannel(
		"private-beds",
		"timer.removed",
		invalidateTimerQueries,
		isAuthenticated,
	);
}
