import {
  ActionIcon,
  Group,
  Loader,
  Select,
  type SelectProps,
  Stack,
  Switch,
  Text,
  TextInput,
} from "@mantine/core";
import {
  IconAlignJustified,
  IconAlignLeft,
  IconCalendarEventFilled,
  IconCheck,
  IconCheckbox,
  IconCircleDot,
  IconSelect,
  IconTrash,
} from "@tabler/icons-react";
import type { PropsWithChildren } from "react";

import { FIELD_TYPE_SELECT_DATA, type FieldTypeName } from "@/constants/fields";
import { useDeleteField } from "@/hooks/fields/useDeleteField";
import { useFieldSaveIndicator } from "@/hooks/fields/useFieldSaveIndicator";
import { useNestedFields } from "@/hooks/fields/useNestedFields";
import type { FormField as TFormField } from "@/types/student-register";
import { isNestedField, isParentField } from "../contexts/fieldContext";
import { useFieldContext } from "../contexts/useFieldContext";
import { useFormEditorFormContext } from "../formEditorFormContext";
import classes from "./FormField.module.css";

const iconProps = {
  color: "currentColor",
  size: 16,
  stroke: 2,
};

const FIELD_TYPE_ICONS = {
  Divider: <Text>&#8212;</Text>,
  "Short Text": <IconAlignLeft {...iconProps} />,
  "Long Text": <IconAlignJustified {...iconProps} />,
  Checkbox: <IconCheckbox {...iconProps} />,
  Dropdown: <IconSelect {...iconProps} />,
  Date: <IconCalendarEventFilled {...iconProps} />,
  Radio: <IconCircleDot {...iconProps} />,
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

export default function FormField({ children }: PropsWithChildren) {
  const form = useFormEditorFormContext();
  const { field, isDefault } = useFieldContext();

  const isNested = isNestedField(field);

  const { isPending, showSuccess } = useFieldSaveIndicator(field.id);

  const selectData = isNested
    ? FIELD_TYPE_SELECT_DATA.filter((d) => d.value !== "Divider")
    : FIELD_TYPE_SELECT_DATA;

  return (
    <Stack gap="sm" flex={1}>
      <Group align="start" flex={1}>
        <TextInput
          flex={1}
          radius="sm"
          size="md"
          disabled={isDefault}
          classNames={{ input: classes.input }}
          key={form.key("name")}
          {...form.getInputProps("name")}
          rightSection={
            isPending ? (
              <Loader size={16} />
            ) : showSuccess ? (
              <IconCheck size={18} color="var(--mantine-color-teal-7)" />
            ) : null
          }
          rightSectionPointerEvents="none"
        />
        <Select
          disabled={isDefault}
          radius="sm"
          size="md"
          leftSection={
            FIELD_TYPE_ICONS[form.useWatchValue("type") as FieldTypeName]
          }
          classNames={{ input: classes.input }}
          styles={{
            input: { color: "var(--mantine-color-gray-7)" },
            dropdown: { color: "var(--mantine-color-gray-7)" },
            section: { color: "var(--mantine-color-gray-7)" },
          }}
          data={selectData}
          renderOption={renderSelectOption}
          allowDeselect={false}
          key={form.key("type")}
          {...form.getInputProps("type")}
          onChange={(value) => {
            form.setFieldValue("type", value as FieldTypeName);
            form.validateField("options");
          }}
        />
      </Group>

      {children}
    </Stack>
  );
}

export function CommonActions() {
  const form = useFormEditorFormContext();
  const { field, fieldType, isDefault } = useFieldContext();
  const { handleDeleteField, deleteFieldMutation } = useDeleteField({
    fieldType,
    id: field.id,
    version_number: field.version_number,
  });

  return (
    <Group justify="end" gap="sm">
      {!isDefault && (
        <Switch
          withThumbIndicator={false}
          label="Required"
          labelPosition="left"
          classNames={{ track: classes.track }}
          c="dimmed"
          disabled={isDefault}
          key={form.key("is_required")}
          {...form.getInputProps("is_required", { type: "checkbox" })}
        />
      )}

      {!isDefault && (
        <ActionIcon
          variant="transparent"
          aria-label="Delete field"
          color="gray.9"
          size="sm"
          disabled={isDefault}
          loading={deleteFieldMutation.isPending}
          onClick={handleDeleteField}
        >
          <IconTrash />
        </ActionIcon>
      )}
    </Group>
  );
}

export function NestedFieldToggle({ option }: { option: string }) {
  const { field } = useFieldContext();
  if (!isParentField(field)) return null;
  return <NestedFieldToggleInner field={field} option={option} />;
}

function NestedFieldToggleInner({
  field,
  option,
}: {
  field: TFormField;
  option: string;
}) {
  const { fieldType, isDefault } = useFieldContext();
  const {
    handleAddNestedField,
    handleRemoveNestedFields,
    createFieldMutation,
    deleteFieldMutation,
  } = useNestedFields({ type: fieldType, parentField: field, option });

  const checked =
    field.additional_fields?.some(
      (f) => f.required_with_field_value === option,
    ) ?? false;

  const isPending =
    createFieldMutation.isPending || deleteFieldMutation.isPending;

  return (
    <Switch
      disabled={isDefault || isPending}
      size="xs"
      withThumbIndicator={false}
      classNames={{ track: classes.track }}
      c="dimmed"
      checked={checked}
      onChange={(event) => {
        if (event.currentTarget.checked) {
          handleAddNestedField();
        } else {
          handleRemoveNestedFields();
        }
      }}
    />
  );
}
