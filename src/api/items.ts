import { apiClient } from "@/services/axios";
import type { PaginationQueryParams, PaginationResponse } from "@/types/api";
import type {
	DispensedItemIndex,
	ItemType,
	MedicineItem,
	SupplyItem,
} from "@/types/items";

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

export type GetDispensedItemsFilters = PaginationQueryParams<{
	search?: string;
}>;

type GetDispensedItemsResponse = PaginationResponse<
	DispensedItemIndex,
	"dispensed_items"
>;

export const getDispensedItems = (filters?: GetDispensedItemsFilters) =>
	apiClient.get<GetDispensedItemsResponse>("/dispensed-items", {
		params: filters,
	});
