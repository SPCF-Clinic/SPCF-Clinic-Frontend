import { useMutation } from "@tanstack/react-query";

import { login, logout } from "@/api/auth";
import { pusher } from "@/services/pusher";
import { useAuthStore } from "@/stores/useAuthStore";
import { clearAuthSession } from "@/utils/auth";

export function useAuth() {
	const setAuth = useAuthStore((state) => state.setAuth);

	const loginMutation = useMutation({
		mutationFn: login,
		onSuccess: ({ data }) => {
			setAuth(data.user, data.token);
			pusher.connect();
		},
	});
	const logoutMutation = useMutation({
		mutationFn: logout,
		onSettled: clearAuthSession,
	});

	return { loginMutation, logoutMutation };
}
