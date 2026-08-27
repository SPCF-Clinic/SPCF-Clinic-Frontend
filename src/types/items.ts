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
