import { apiClient } from "@/services/axios";
import type { UserIndex } from "@/types/users";

export interface GetUsersFilters {
	search?: string;
}

type GetUsersResponse = UserIndex;

export const getUsers = (filters?: GetUsersFilters) =>
	apiClient.get<GetUsersResponse[]>("/users", { params: filters });
