import { TextInput } from "@mantine/core";

import FormField, { CommonActions } from "./FormField";
import classes from "./FormField.module.css";

export default function LongTextField() {
	return (
		<FormField>
			<TextInput
				variant="unstyled"
				disabled
				placeholder="Long answer text"
				classNames={{ input: classes.inputPreview }}
			/>
			<CommonActions />
		</FormField>
	);
}
