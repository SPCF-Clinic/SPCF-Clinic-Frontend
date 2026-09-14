import { useFormEditorFormContext } from "../formEditorFormContext";
import DateField from "./DateField";
import DividerField from "./DividerField";
import FormField from "./FormField";
import LongTextField from "./LongTextField";
import ShortTextField from "./ShortTextField";
import MultipleField from "./MultipleField";

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
    case "Dropdown":
    case "Radio":
      return <MultipleField type={type} />;
    case "Date":
      return <DateField />;
    default:
      return <FormField />;
  }
}
