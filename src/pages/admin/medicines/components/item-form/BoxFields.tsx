import { EMPTY_ITEM_CONTENT, ITEM_UNITS } from "@/constants/items";
import type { ItemType } from "@/types/items";
import { NumberField, SelectField } from "./ItemFormModal";
import { type ContentUnit, useItemFormContext } from "./itemFormContext";

export default function BoxFields({ itemType }: { itemType: ItemType }) {
	const form = useItemFormContext();

	const contentUnit = form.useWatchValue("item_content.content_unit");

	const handleUnitChange = (value: string | null) => {
		form.setFieldValue("item_content.content_unit", value as ContentUnit);
		form.setFieldValue("item_content.quantity_per_item_unit", undefined);
		form.setFieldValue("item_content.item_content", EMPTY_ITEM_CONTENT);
		form.clearFieldError("item_content.quantity_per_item_unit");
	};

	return (
		<>
			<NumberField
				label="Number of Boxes"
				key={form.key("quantity")}
				{...form.getInputProps("quantity")}
			/>
			<SelectField
				label="Unit of Content"
				data={ITEM_UNITS[itemType].filter((unit) => unit !== "Boxes")}
				key={form.key("item_content.content_unit")}
				{...form.getInputProps("item_content.content_unit")}
				onChange={handleUnitChange}
			/>
			<NumberField
				label="Quantity per box"
				key={form.key("item_content.quantity_per_item_unit")}
				{...form.getInputProps("item_content.quantity_per_item_unit")}
			/>
			{contentUnit === "Bottles" && (
				<NumberField
					label="Volume per bottle (ml)"
					key={form.key("item_content.item_content.quantity_per_item_unit")}
					{...form.getInputProps(
						"item_content.item_content.quantity_per_item_unit",
					)}
				/>
			)}
		</>
	);
}
