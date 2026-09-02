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
	item_content?: ItemContent & { item_content?: ItemContent };
}>;

interface ItemContent {
	content_unit?: ContentUnit;
	quantity_per_item_unit?: number;
}

export type ContentUnit = Exclude<ItemUnit<ItemType>, "Boxes"> | "ml";

export const [ItemFormProvider, useItemFormContext, useItemForm] =
	createFormContext<ItemFormValues>();

export const itemFormTransformValues = (
	values: ItemFormValues,
): ItemFormValues => {
	if (values.unit === "Bottles") {
		return {
			...values,
			item_content: { ...values.item_content, content_unit: "ml" as const },
		};
	}

	if (values.item_content?.content_unit === "Bottles") {
		return {
			...values,
			item_content: {
				...values.item_content,
				item_content: {
					...values.item_content.item_content,
					content_unit: "ml" as const,
				},
			},
		};
	}

	delete values.item_content?.item_content;
	return values;
};

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
		item_content: {
			quantity_per_item_unit: (value, { item_content }) => {
				if (!requiresItemContent(itemType, item_content?.content_unit))
					return null;
				return getQuantityPerItemUnitErrorMessage(
					value,
					item_content?.content_unit,
				);
			},
		},
	},
});

const getQuantityPerItemUnitErrorMessage = <T extends ItemType>(
	value?: number | "",
	unit?: ItemUnit<T> | "ml",
) => {
	let label: string | undefined;
	switch (unit) {
		case "Boxes":
			label = "Quantity per box";
			break;
		case "Bottles":
		case "ml":
			label = "Volume per bottle";
			break;
		default:
			return null;
	}

	if (value === undefined || value === "") return `${label} is required`;
	if (value <= 0) return `${label} must be greater than 0`;
	return null;
};

function requiresItemContent(type: ItemType, unit?: ItemUnit<ItemType> | "ml") {
	if (type === "Medicine") {
		return unit === "Boxes" || unit === "Bottles" || unit === "ml";
	}

	return unit === "Boxes";
}
