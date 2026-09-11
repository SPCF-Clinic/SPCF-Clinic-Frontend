import { ActionIcon, Stack, Text, TextInput } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";

import { isNestedField } from "../contexts/fieldContext";
import { useFieldContext } from "../contexts/useFieldContext";
import { useFormEditorFormContext } from "../formEditorFormContext";
import FormField, {
	CommonActions,
	NestedFieldToggle,
	type Option,
} from "./FormField";
import classes from "./FormField.module.css";
import { NestedFields } from "./NestedFields";

export default function DropdownField() {
	const form = useFormEditorFormContext();
	const { field, isDefault } = useFieldContext();

	const isNested = isNestedField(field);

	const [options, setOptions] = useState<Option[]>(() => {
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
	});

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

	const rightSection = ({ id, value }: Option) => (
		<>
			{!isNested && <NestedFieldToggle option={value} />}
			<ActionIcon
				variant="transparent"
				color="gray.9"
				size="sm"
				aria-label="Delete option"
				disabled={isDefault}
				onClick={() => handleRemove(id)}
			>
				<IconX size={18} />
			</ActionIcon>
		</>
	);

	return (
		<FormField>
			<Stack gap="sm">
				{options.map((option, i) => {
					const isLast = i === options.length - 1;

					return (
						<TextInput
							disabled={isDefault}
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
							rightSectionWidth="auto"
							rightSection={isLast ? undefined : rightSection(option)}
							variant="unstyled"
							size="md"
							value={option.value}
							placeholder={isLast ? "Add Option" : undefined}
							classNames={{
								input: classes.inputPreview,
								section: classes.section,
							}}
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

			<NestedFields />

			<CommonActions />
		</FormField>
	);
}
