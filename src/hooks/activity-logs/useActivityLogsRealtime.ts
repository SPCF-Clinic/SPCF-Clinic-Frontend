import { type QueryKey, useQueryClient } from "@tanstack/react-query";

import { useAuthStore } from "@/stores/useAuthStore";
import { usePusherChannel } from "../pusher/usePusherChannel";

export function useActivityLogsRealtime(queryKey: QueryKey) {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	const queryClient = useQueryClient();

	const invalidateActivityLogQueries = () => {
		queryClient.invalidateQueries({ queryKey });
	};

	usePusherChannel(
		"private-dashboard",
		"activity-log.created",
		invalidateActivityLogQueries,
		isAuthenticated,
	);
}
