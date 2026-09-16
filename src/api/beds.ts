import { apiClient } from "@/services/axios";
import type {
	CursorPaginationQueryParams,
	CursorPaginationResponse,
} from "@/types/api";
import type { BedIndex, EmptyBed, OccupiedBed } from "@/types/beds";

export type BedQueryStatus = "Empty" | "Occupied" | "All";

export type GetBedsFilters<S extends BedQueryStatus> =
	CursorPaginationQueryParams<{
		status?: S;
	}>;

type BedForStatus<S extends BedQueryStatus> = S extends "Empty"
	? EmptyBed
	: S extends "Occupied"
		? OccupiedBed
		: BedIndex;

export const getBeds = <S extends BedQueryStatus>(
	filters?: GetBedsFilters<S>,
) =>
	apiClient.get<CursorPaginationResponse<BedForStatus<S>>>("/beds", {
		params: filters,
	});
