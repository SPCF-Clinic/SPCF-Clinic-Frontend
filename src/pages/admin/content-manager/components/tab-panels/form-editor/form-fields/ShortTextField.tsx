import { TextInput } from "@mantine/core";

import FormField, { CommonActions } from "./FormField";
import classes from "./FormField.module.css";

export default function ShortTextField() {
	return (
		<FormField>
			<TextInput
				variant="unstyled"
				disabled
				placeholder="Short answer text"
				classNames={{ input: classes.input }}
			/>
			<CommonActions />
		</FormField>
	);
}
