import { ActionIcon, Stack, Text, TextInput } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";

import { useFieldContext } from "../contexts/useFieldContext";
import { useFormEditorFormContext } from "../formEditorFormContext";
import FormField from "./FormField";
import classes from "./FormField.module.css";

export default function RadioField() {
	const form = useFormEditorFormContext();
	const { field } = useFieldContext();

	const [options, setOptions] = useState<{ id: string; value: string }[]>(
		() => {
			const values = (form.getValues().options as string[] | undefined) ?? [];

			const rows = values.map((value) => ({
				id: crypto.randomUUID(),
				value,
			}));

			// Always have one empty option at the bottom.
			if (rows.length === 0 || rows.at(-1)?.value.trim() !== "") {
				rows.push({
					id: crypto.randomUUID(),
					value: "",
				});
			}

			return rows;
		},
	);

	const handleChange = (id: string, value: string) => {
		const currentIndex = options.findIndex((option) => option.id === id);

		const next = options.map((option) =>
			option.id === id ? { ...option, value } : option,
		);

		// When the last empty option gets a value,
		// create another empty option.
		if (currentIndex === options.length - 1 && value.trim() !== "") {
			next.push({
				id: crypto.randomUUID(),
				value: "",
			});
		}

		setOptions(next);
		form.setFieldValue(
			"options",
			next.map((option) => option.value),
		);
	};

	const handleRemove = (id: string) => {
		const next = options.filter((option) => option.id !== id);

		// Always keep one empty option at the bottom.
		if (next.length === 0 || next.at(-1)?.value.trim() !== "") {
			next.push({
				id: crypto.randomUUID(),
				value: "",
			});
		}

		setOptions(next);
		form.setFieldValue(
			"options",
			next.map((option) => option.value),
		);
	};

	const optionsError = form.errors.options;

	return (
		<FormField>
			<Stack gap="sm">
				{options.map((option, i) => {
					const isLast = i === options.length - 1;

					return (
						<TextInput
							disabled={field.is_default}
							key={option.id}
							flex={1}
							leftSectionPointerEvents="none"
							leftSection={
								<input
									type="checkbox"
									disabled
									className={classes.inputPreview}
								/>
							}
							rightSection={
								isLast ? undefined : (
									<ActionIcon
										variant="transparent"
										color="gray.9"
										size="sm"
										aria-label="Delete option"
										disabled={field.is_default}
										onClick={() => handleRemove(option.id)}
									>
										<IconX size={18} />
									</ActionIcon>
								)
							}
							variant="unstyled"
							size="md"
							value={option.value}
							placeholder={isLast ? "Add Option" : undefined}
							classNames={{ input: classes.inputPreview }}
							onChange={(event) =>
								handleChange(option.id, event.currentTarget.value)
							}
						/>
					);
				})}

				{optionsError && (
					<Text c="red" size="sm">
						{optionsError}
					</Text>
				)}
			</Stack>
		</FormField>
	);
}
