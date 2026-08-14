import { apiClient } from "@/services/axios";
import type { User } from "@/types/auth";

export const validateToken = () => apiClient.get<User>("/auth/me");

interface LoginResponse {
	user: User;
	token: string;
}

export const login = (data: { username: string; password: string }) =>
	apiClient.post<LoginResponse>("/auth/login", data);

export const logout = () => apiClient.post<null>("/auth/logout");
