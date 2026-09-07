import { ActionIcon, Stack, Text, TextInput } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";

import { useFormEditorFormContext } from "../formEditorFormContext";
import FormField, { CommonActions } from "./FormField";
import classes from "./FormField.module.css";

export default function DropdownField() {
	const form = useFormEditorFormContext();

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

	return (
		<FormField>
			<Stack gap="sm">
				{options.map((option, index) => {
					const isLast = index === options.length - 1;

					return (
						<TextInput
							key={option.id}
							flex={1}
							leftSectionPointerEvents="none"
							leftSection={
								<Text size="sm" c="dimmed" w={20} ta="center">
									{index + 1}.
								</Text>
							}
							rightSection={
								isLast ? null : (
									<ActionIcon
										variant="transparent"
										color="gray.9"
										size="sm"
										aria-label="Delete option"
										onClick={() => handleRemove(option.id)}
									>
										<IconX size={18} />
									</ActionIcon>
								)
							}
							placeholder={isLast ? "Add Option" : undefined}
							variant="unstyled"
							size="md"
							value={option.value}
							onChange={(event) =>
								handleChange(option.id, event.currentTarget.value)
							}
							classNames={{ input: classes.input }}
						/>
					);
				})}
			</Stack>

			<CommonActions />
		</FormField>
	);
}
