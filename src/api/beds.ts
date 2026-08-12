import { apiClient } from "@/services/axios";
import type { Bed } from "@/types/beds";

export interface GetBedsFilters {
  cursor: string;
}

interface GetBedsResponse {
  data: Bed[];
  path: string;
  per_page: number;
  next_cursor: string | null;
  next_page_url: string | null;
  prev_cursor: string | null;
  prev_page_url: string | null;
}

export const getBeds = (filters?: GetBedsFilters) =>
  apiClient.get<GetBedsResponse>("/beds", { params: filters });
