import { ActionIcon, Stack, Text, TextInput } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";

import type { Option } from "@/types/student-register";
import { isNestedField } from "../contexts/fieldContext";
import { useFieldContext } from "../contexts/useFieldContext";
import { useFormEditorFormContext } from "../formEditorFormContext";
import FormField, {
	CommonActions,
	type EditableOption,
	NestedFieldToggle,
} from "./FormField";
import classes from "./FormField.module.css";
import { NestedFields } from "./NestedFields";

export default function CheckboxField() {
	const form = useFormEditorFormContext();
	const { field, isDefault } = useFieldContext();

	const isNested = isNestedField(field);

	const [options, setOptions] = useState<EditableOption[]>(() => {
		const values = (form.getValues().options as Option[] | undefined) ?? [];

		const rows = values.map((option) => ({
			id: String(option.id),
			value: option.value,
		}));

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

		// The last row is the "new option" row.
		// Once it gets a value, append another empty row.
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

		// Always keep one empty row at the bottom.
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

	const rightSection = ({ id, value }: EditableOption) => (
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
