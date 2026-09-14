import { Button, Collapse, Stack, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useNestedFields } from "@/hooks/fields/useNestedFields";
import type { AdditionalField, FormField } from "@/types/student-register";
import { isParentField } from "../contexts/fieldContext";
import { useFieldContext } from "../contexts/useFieldContext";
import NestedField from "./NestedField";

export function NestedFields() {
  const { field } = useFieldContext();
  if (!isParentField(field)) return null;

  const grouped = new Map<string, AdditionalField[]>();
  for (const nested of field.additional_fields ?? []) {
    const list = grouped.get(nested.required_with_field_value) ?? [];
    list.push(nested);
    grouped.set(nested.required_with_field_value, list);
  }

  return (
    <>
      {field.options.map((option) => (
        <NestedFieldGroup
          key={option.id}
          optionId={option.id}
          optionValue={option.value}
          nested={grouped.get(option.value) ?? []}
        />
      ))}
    </>
  );
}

function NestedFieldGroup({
  optionId,
  optionValue,
  nested,
}: {
  optionId: number;
  optionValue: string;
  nested: AdditionalField[];
}) {
  const { field } = useFieldContext();

  if (!isParentField(field)) return null;

  return (
    <NestedFieldGroupInner
      field={field}
      optionId={optionId}
      optionValue={optionValue}
      nested={nested}
    />
  );
}

function NestedFieldGroupInner({
  field,
  optionId,
  optionValue,
  nested,
}: {
  field: FormField;
  optionId: number;
  optionValue: string;
  nested: AdditionalField[];
}) {
  const { isDefault, fieldType } = useFieldContext();
  const { handleAddNestedField, createFieldMutation } = useNestedFields({
    type: fieldType,
    parentField: field,
    optionId,
    optionValue,
  });
  const expanded = nested.length > 0;

  return (
    <Collapse expanded={expanded}>
      <Stack gap="sm" mt="sm" pl="md">
        <Text size="xs" c="dimmed" fs="italic">
          Shows if: {field.name} equals &quot;{optionValue}&quot;
        </Text>

        {nested.map((additional) => (
          <NestedField key={additional.id} field={additional} />
        ))}

        {!isDefault && (
          <Button
            variant="subtle"
            size="xs"
            w="fit-content"
            leftSection={<IconPlus size={14} />}
            loading={createFieldMutation.isPending}
            onClick={handleAddNestedField}
          >
            Add field
          </Button>
        )}
      </Stack>
    </Collapse>
  );
}
