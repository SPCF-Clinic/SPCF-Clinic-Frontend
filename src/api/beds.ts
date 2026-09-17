 import type {
  CursorPaginationQueryParams,
  CursorPaginationResponse,
} from "@/types/api";
import { apiClient } from "@/services/axios";
import type { BedIndex } from "@/types/beds";

export type GetBedsFilters = CursorPaginationQueryParams;

type GetBedsResponse = CursorPaginationResponse<BedIndex>;

export const getBeds = (filters?: GetBedsFilters) =>
  apiClient.get<GetBedsResponse>("/beds", { params: filters });

