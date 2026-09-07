import { useFormEditorFormContext } from "../formEditorFormContext";
import CheckboxField from "./CheckboxField";
import DateField from "./DateField";
import DividerField from "./DividerField";
import DropdownField from "./DropdownField";
import FormField from "./FormField";
import LongTextField from "./LongTextField";
import RadioField from "./RadioField";
import ShortTextField from "./ShortTextField";

export default function FieldRenderer() {
	const form = useFormEditorFormContext();
	const type = form.useWatchValue("type");

	switch (type) {
		case "Divider":
			return <DividerField />;
		case "Short Text":
			return <ShortTextField />;
		case "Long Text":
			return <LongTextField />;
		case "Checkbox":
			return <CheckboxField />;
		case "Dropdown":
			return <DropdownField />;
		case "Date":
			return <DateField />;
		case "Radio":
			return <RadioField />;
		default:
			return <FormField />;
	}
}
