import { apiClient } from "@/services/axios";
import type { PaginationQueryParams, PaginationResponse } from "@/types/api";
import type { UserIndex } from "@/types/users";

export type GetUsersFilters = PaginationQueryParams<{
	search?: string;
}>;

type GetUsersResponse = PaginationResponse<UserIndex, "users">;

export const getUsers = (filters?: GetUsersFilters) =>
	apiClient.get<GetUsersResponse>("/users", { params: filters });
