import type { ItemFormValues } from "@/pages/admin/medicines/components/item-form/itemFormContext";
import { apiClient } from "@/services/axios";
import type { PaginationQueryParams, PaginationResponse } from "@/types/api";
import type {
	DispensedItemIndex,
	ItemIndex,
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

export const createItem = (data: ItemFormValues) =>
	apiClient.post<ItemIndex>("/items", data);

export const editItem = (itemId: number, data: ItemFormValues) =>
	apiClient.put<ItemIndex>(`/items/${itemId}`, data);

export const deleteItem = (itemId: number) =>
	apiClient.delete(`/items/${itemId}`);

interface DispenseItemData {
	item_id: number;
	quantity_dispensed: number;
	dispensed_to?: number;
}

export const dispenseItem = (data: DispenseItemData) =>
	apiClient.post("/dispense-item", data);
