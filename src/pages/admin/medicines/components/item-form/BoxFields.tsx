import { ITEM_UNITS } from "@/constants/items";
import type { ItemType } from "@/types/items";
import { NumberField, SelectField } from "./ItemFormModal";
import { useItemFormContext } from "./itemFormContext";

export default function BoxFields({ itemType }: { itemType: ItemType }) {
	const form = useItemFormContext();

	const contentUnit = form.useWatchValue("item_content.content_unit");

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
			/>
			<NumberField
				label="Quantity per box"
				key={form.key("item_content.quantity_per_item_unit")}
				{...form.getInputProps("item_content.quantity_per_item_unit")}
			/>
			{contentUnit === "Bottles" && (
				<NumberField label="Volume per bottle (ml)" />
			)}
		</>
	);
}
