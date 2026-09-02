import { NumberField } from "./ItemFormModal";
import { useItemFormContext } from "./itemFormContext";

export default function BottleFields() {
	const form = useItemFormContext();

	return (
		<>
			<NumberField
				label="Number of bottles"
				key={form.key("quantity")}
				{...form.getInputProps("quantity")}
			/>
			<NumberField
				label="Volume per bottle (ml)"
				key={form.key("item_content.quantity_per_item_unit")}
				{...form.getInputProps("item_content.quantity_per_item_unit")}
			/>
		</>
	);
}
