import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/shallow";

import { login, logout } from "@/api/auth";
import { useAuthStore } from "@/stores/useAuthStore";

export function useAuth() {
	const queryClient = useQueryClient();

	const { setAuth, logoutAuth } = useAuthStore(
		useShallow((state) => ({
			setAuth: state.setAuth,
			logoutAuth: state.logout,
		})),
	);

	const loginMutation = useMutation({
		mutationFn: login,
		onSuccess: ({ data }) => setAuth(data.user, data.token),
	});
	const logoutMutation = useMutation({
		mutationFn: logout,
		onSettled: async () => {
			await queryClient.cancelQueries();

			queryClient.clear();

			logoutAuth();
		},
	});

	return { loginMutation, logoutMutation };
}
