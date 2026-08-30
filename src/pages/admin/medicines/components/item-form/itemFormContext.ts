import {
	createFormContext,
	type FormValidateInput,
	isNotEmpty,
	isOneOf,
} from "@mantine/form";
import { ITEM_CATEGORIES, ITEM_UNITS } from "@/constants/items";
import type { ItemCategory, ItemType, ItemUnit } from "@/types/items";

export type ItemFormValues = Partial<{
	name: string;
	type: ItemType;
	category: ItemCategory<ItemType>;
	unit: ItemUnit<ItemType>;
	quantity: number;
	item_content?: {
		content_unit?: Exclude<ItemUnit<ItemType>, "Boxes"> | "ml";
		quantity_per_item_unit?: number;
	};
}>;

export const [ItemFormProvider, useItemFormContext, useItemForm] =
	createFormContext<ItemFormValues>();

export const itemFormValidate = (
	itemType: ItemType,
): FormValidateInput<ItemFormValues> => ({
	name: (value) => {
		const trimmedValue = value?.trim() ?? "";

		if (trimmedValue.length > 255) {
			return "Name must not exceed 255 characters";
		}

		return isNotEmpty("Name is required")(trimmedValue);
	},
	category: isOneOf(ITEM_CATEGORIES[itemType], "Category is required"),
	unit: isOneOf(ITEM_UNITS[itemType], "Unit is required"),
	quantity: isNotEmpty("Quantity is required"),
	item_content: {
		content_unit: (value, { unit }) => {
			if (!requiresItemContent(itemType, unit) || unit === "Bottles") {
				return null;
			}

			return isOneOf(
				ITEM_UNITS[itemType].filter((u) => u !== "Boxes"),
				"Unit of content is required",
			)(value);
		},
		quantity_per_item_unit: (value, { unit }) => {
			if (!requiresItemContent(itemType, unit)) return null;
			return getQuantityPerItemUnitErrorMessage(value, unit);
		},
	},
});

const getQuantityPerItemUnitErrorMessage = <T extends ItemType>(
	value?: number,
	unit?: ItemUnit<T>,
) => {
	let label: string | undefined;
	switch (unit) {
		case "Boxes":
			label = "Quantity per box";
			break;
		case "Bottles":
			label = "Volume per bottle";
			break;
		default:
			return null;
	}

	if (value === undefined) return `${label} is required`;
	if (value <= 0) return `${label} must be greater than 0`;
	return null;
};

function requiresItemContent(type: ItemType, unit?: ItemUnit<ItemType>) {
	if (type === "Medicine") {
		return unit === "Boxes" || unit === "Bottles";
	}

	return unit === "Boxes";
}
