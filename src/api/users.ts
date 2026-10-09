import { apiClient } from "@/services/axios";
import type { PaginationQueryParams, PaginationResponse } from "@/types/api";
import type { StudentIndex } from "@/types/students";
import type { UserIndex, UserUpdateResponse } from "@/types/users";

export type GetUsersFilters = PaginationQueryParams<{
  search?: string;
}>;

type GetUsersResponse = PaginationResponse<UserIndex, "users">;

export const getUsers = (filters?: GetUsersFilters) =>
  apiClient.get<GetUsersResponse>("/users", { params: filters });

type UpdateUserResult = StudentIndex | UserUpdateResponse;

export const updateUserPassword = (userId: number, password: string) =>
  apiClient.put<UpdateUserResult>(`/users/${userId}`, { password });

export const archiveUser = (
  userId: number,
  payload: { status: "ARCHIVE" | "UNARCHIVE" },
) => apiClient.put<UpdateUserResult>(`/users/${userId}`, payload);
