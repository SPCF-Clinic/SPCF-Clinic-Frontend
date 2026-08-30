import type { ITEM_CATEGORIES, ITEM_UNITS } from "@/constants/items";

export type ItemIndex = MedicineItem | SupplyItem;

export type MedicineItem = {
	[U in MedicineUnit]: ItemIndexForUnit<"Medicine", U>;
}[MedicineUnit];

export type SupplyItem = {
	[U in SupplyUnit]: ItemIndexForUnit<"Supply", U>;
}[SupplyUnit];

type ItemIndexForUnit<
	T extends ItemType,
	U extends ItemUnit<T>,
> = BaseItem<T> & {
	unit: U;
} & (U extends "Boxes" | "Bottles"
		? {
				item_content: ItemContent;
			}
		: Record<string, never>);

interface BaseItem<T extends ItemType> {
	id: number;
	name: string;
	type: T;
	category: ItemCategory<T>;
	unit: ItemUnit<T>;
	dispensed: number;
	quantity: number;
}

export type ItemType = "Medicine" | "Supply";

export type MedicineCategory = (typeof ITEM_CATEGORIES.Medicine)[number];
export type MedicineUnit = (typeof ITEM_UNITS.Medicine)[number];

export type SupplyCategory = (typeof ITEM_CATEGORIES.Supply)[number];
export type SupplyUnit = (typeof ITEM_UNITS.Supply)[number];

export type ItemCategory<T extends ItemType> = T extends "Medicine"
	? MedicineCategory
	: SupplyCategory;

export type ItemUnit<T extends ItemType> = T extends "Medicine"
	? MedicineUnit
	: SupplyUnit;

interface ItemContent {
	content_unit: Exclude<ItemUnit<ItemType>, "Boxes">;
	quantity_per_item_unit: number;
}

export interface DispensedItemIndex {
	id: number;
	item: {
		id: number;
		name: string;
		unit: string;
		quantity: number;
	};
	dispensed_to: {
		id: number;
		name: string;
	};
	created_at: string;
}

export type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";
