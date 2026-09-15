import { ActionIcon, Stack, Text, TextInput } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";

import type { FormEditingOption } from "@/api/fields";
import { isNestedField } from "../contexts/fieldContext";
import { useFieldContext } from "../contexts/useFieldContext";
import { useFormEditorFormContext } from "../formEditorFormContext";
import FormField, { CommonActions, NestedFieldToggle } from "./FormField";
import classes from "./FormField.module.css";
import { NestedFields } from "./NestedFields";

export default function MultipleField({
  type,
}: {
  type: "Checkbox" | "Radio" | "Dropdown";
}) {
  const form = useFormEditorFormContext();
  const { field, isDefault } = useFieldContext();

  const isNested = isNestedField(field);

  const [options, setOptions] = useState<FormEditingOption[]>(() => {
    const values = form.getValues().options ?? [];

    const rows = [...values];

    if (rows.length === 0 || rows.at(-1)?.value.trim() !== "") {
      rows.push({
        key: crypto.randomUUID(),
        value: "",
      });
    }

    return rows;
  });

  const persist = (rows: FormEditingOption[]) => {
    form.setFieldValue(
      "options",
      rows.filter((row) => row.value.trim() !== ""),
    );
    form.validateField("options");
  };

  const handleChange = (key: string, value: string) => {
    const currentIndex = options.findIndex((o) => o.key === key);
    const next = options.map((o) => (o.key === key ? { ...o, value } : o));

    if (currentIndex === options.length - 1 && value.trim() !== "") {
      next.push({ key: crypto.randomUUID(), value: "" });
    }

    setOptions(next);
    persist(next);
  };

  const handleRemove = (key: string) => {
    const next = options.filter((o) => o.key !== key);

    if (next.length === 0 || next.at(-1)?.value.trim() !== "") {
      next.push({ key: crypto.randomUUID(), value: "" });
    }

    setOptions(next);
    persist(next);
  };

  const optionsError = form.errors.options;

  const rightSection = (option: FormEditingOption) => (
    <>
      {!isNested && <NestedFieldToggle option={option} />}
      <ActionIcon
        variant="transparent"
        color="gray.9"
        size="sm"
        aria-label="Delete option"
        disabled={isDefault}
        onClick={() => handleRemove(option.key)}
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
              key={option.key}
              flex={1}
              leftSectionPointerEvents="none"
              leftSection={
                type === "Dropdown" ? (
                  <Text size="sm" c="dimmed" w={20} ta="center">
                    {i + 1}.
                  </Text>
                ) : (
                  <input
                    type="checkbox"
                    disabled
                    className={classes.inputPreview}
                  />
                )
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
                handleChange(option.key, event.currentTarget.value)
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

      <CommonActions />
      <NestedFields />
    </FormField>
  );
}
