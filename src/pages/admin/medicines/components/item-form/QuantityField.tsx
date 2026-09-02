import { NumberField } from "./ItemFormModal";
import { useItemFormContext } from "./itemFormContext";

export default function QuantityField() {
	const form = useItemFormContext();

	return (
		<NumberField
			label="Quantity"
			key={form.key("quantity")}
			{...form.getInputProps("quantity")}
		/>
	);
}
