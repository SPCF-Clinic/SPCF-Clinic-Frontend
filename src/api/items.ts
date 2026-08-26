import { apiClient } from "@/services/axios";
import type { PaginationQueryParams, PaginationResponse } from "@/types/api";
import type { ItemType, MedicineItem, SupplyItem } from "@/types/items";

type ItemByType = {
	Medicine: MedicineItem;
	Supply: SupplyItem;
};

export type GetItemsFilters<T extends ItemType> = PaginationQueryParams<{
	type: T;
	search?: string;
}>;

type GetItemsResponse<T extends ItemType> = PaginationResponse<
	ItemByType[T],
	"items"
>;

export const getItems = <T extends ItemType>(filters: GetItemsFilters<T>) =>
	apiClient.get<GetItemsResponse<T>>("/items", { params: filters });
