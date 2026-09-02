import axios, { type AxiosError } from "axios";

import { useAuthStore } from "@/stores/useAuthStore";
import type { ApiErrorResponse } from "@/types/api";
import { queryClient } from "./query-client";

export const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

apiClient.interceptors.request.use(
	(config) => {
		const token = useAuthStore.getState().token;
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
	(response) => response.data,
	(error: AxiosError<ApiErrorResponse>) => {
		if (error.response?.status === 401) {
			useAuthStore.getState().logout();
			queryClient.clear();
		}
		return Promise.reject(error);
	},
);
