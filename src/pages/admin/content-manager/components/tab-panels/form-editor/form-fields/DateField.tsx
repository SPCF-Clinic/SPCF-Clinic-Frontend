import { Group, TextInput } from "@mantine/core";

import FormField, { CommonActions } from "./FormField";
import classes from "./FormField.module.css";

export default function DateField() {
	return (
		<FormField>
			<Group>
				<TextInput
					variant="unstyled"
					disabled
					placeholder="Month"
					flex={1}
					classNames={{ input: classes.inputPreview }}
				/>
				<TextInput
					variant="unstyled"
					disabled
					placeholder="Day"
					maw="9rem"
					classNames={{ input: classes.inputPreview }}
				/>
				<TextInput
					variant="unstyled"
					disabled
					placeholder="Year"
					maw="9rem"
					classNames={{ input: classes.inputPreview }}
				/>
			</Group>

			<CommonActions />
		</FormField>
	);
}
