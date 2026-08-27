import { LOW_STOCK_LIMITS } from "@/constants/items";
import type { ItemIndex, StockStatus } from "@/types/items";

export function getStockStatus(item: ItemIndex): StockStatus {
	const quantity = item.quantity;

	if (quantity === 0) {
		return "Out of Stock";
	}

	const limit =
		item.type === "Medicine"
			? LOW_STOCK_LIMITS.Medicine[item.unit]
			: LOW_STOCK_LIMITS.Supply[item.unit];

	// If no threshold is configured for this type/unit,
	// treat it as In Stock rather than making assumptions.
	if (limit === undefined) {
		return "In Stock";
	}

	return quantity <= limit ? "Low Stock" : "In Stock";
}
