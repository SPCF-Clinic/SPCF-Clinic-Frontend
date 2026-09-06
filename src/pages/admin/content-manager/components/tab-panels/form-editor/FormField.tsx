import {
	ActionIcon,
	Group,
	Select,
	type SelectProps,
	Stack,
	Text,
	TextInput,
} from "@mantine/core";
import { IconCheck, IconGripVertical, IconTrash } from "@tabler/icons-react";
import type { PropsWithChildren } from "react";
import { FIELD_TYPE_SELECT_DATA, type FieldTypeName } from "@/constants/fields";
import { useFormEditorFormContext } from "./formEditorFormContext";

const FIELD_TYPE_ICONS = {
	Divider: <Text>&#8212;</Text>,
	"Short Text": <IconGripVertical size={16} />,
	"Long Text": <IconGripVertical size={16} />,
	Checkbox: <IconGripVertical size={16} />,
	Dropdown: <IconGripVertical size={16} />,
	Date: <IconGripVertical size={16} />,
	Radio: <IconGripVertical size={16} />,
} satisfies Record<FieldTypeName, React.ReactElement>;

const renderSelectOption: SelectProps["renderOption"] = ({
	option,
	checked,
}) => (
	<Group flex="1" gap="xs">
		{FIELD_TYPE_ICONS[option.value as FieldTypeName]}
		{option.label}
		{checked && <IconCheck style={{ marginInlineStart: "auto" }} size={16} />}
	</Group>
);

export function FieldRenderer() {
	const form = useFormEditorFormContext();
	const type = form.useWatchValue("type") as FieldTypeName;

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

function DividerField() {
	return (
		<FormField>
			<ActionIcon
				style={{ alignSelf: "flex-end" }}
				variant="transparent"
				aria-label="Delete field"
				color="gray"
				size="sm"
			>
				<IconTrash />
			</ActionIcon>
		</FormField>
	);
}

function ShortTextField() {
	return <FormField></FormField>;
}

function LongTextField() {
	return <FormField></FormField>;
}

function CheckboxField() {
	return <FormField></FormField>;
}

function DropdownField() {
	return <FormField></FormField>;
}

function DateField() {
	return <FormField></FormField>;
}

function RadioField() {
	return <FormField></FormField>;
}

function FormField({ children }: PropsWithChildren) {
	const form = useFormEditorFormContext();

	return (
		<Stack gap="sm" flex={1}>
			<Group align="start" flex={1}>
				<TextInput
					flex={1}
					radius="sm"
					size="md"
					key={form.key("name")}
					{...form.getInputProps("name")}
				/>
				<Select
					radius="sm"
					size="md"
					leftSection={
						FIELD_TYPE_ICONS[form.useWatchValue("type") as FieldTypeName]
					}
					styles={{
						input: { color: "var(--mantine-color-gray-7)" },
						dropdown: { color: "var(--mantine-color-gray-7)" },
					}}
					data={FIELD_TYPE_SELECT_DATA}
					renderOption={renderSelectOption}
					// allowDeselect={false}
					key={form.key("type")}
					{...form.getInputProps("type")}
				/>
			</Group>

			{children}
		</Stack>
	);
}
