interface ItemIndex<T extends ItemType> {
	id: number;
	name: string;
	type: T;
	category: string;
	unit: string;
	quantity: number;
	item_content: ItemContent;
}

export type ItemType = "Medicine" | "Supply";

interface ItemContent {
	content_unit: string;
	quantity_per_item_unit: number;
}

export type MedicineItem = ItemIndex<"Medicine">;
export type SupplyItem = ItemIndex<"Supply">;
