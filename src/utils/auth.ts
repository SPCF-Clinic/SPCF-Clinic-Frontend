import { pusher } from "@/services/pusher";
import { queryClient } from "@/services/query-client";
import { useAuthStore } from "@/stores/useAuthStore";

export const clearAuthSession = async () => {
	pusher.disconnect();
	await queryClient.cancelQueries();
	queryClient.clear();
	useAuthStore.getState().logout();
};
