import { useSortable } from "@dnd-kit/react/sortable";
import { Center, Group, Paper, Stack } from "@mantine/core";
import { isNotEmpty } from "@mantine/form";
import { useDebouncedCallback, useId } from "@mantine/hooks";
import { IconGripVertical } from "@tabler/icons-react";
import { memo, useEffect, useRef, useState } from "react";

import type { FieldType } from "@/api/fields";
import { useEditFieldMutation } from "@/hooks/fields/useEditFieldMutation";
import type { FormField } from "@/types/student-register";
import { showToastError } from "@/utils/toastError";
import FieldProvider from "./contexts/FieldProvider";
import FieldRenderer from "./form-fields/FieldRenderer";
import {
	type FieldFormValues,
	FormEditorFormProvider,
	useFormEditorForm,
} from "./formEditorFormContext";

interface SortableFieldItemProps {
	field?: FormField;
	index: number;
	fieldType: FieldType;
}

const validators = {
	name: isNotEmpty("Field name is required"),
	type: isNotEmpty("Field type is required"),
};

function hasValidationErrors(values: FieldFormValues) {
	return Object.entries(validators).some(
		([key, validate]) => validate(values[key as keyof FieldFormValues]) != null,
	);
}

function removeTrailingEmptyOption(options?: string[]) {
	if (options?.at(-1) === "") {
		return options.slice(0, -1);
	}

	return options;
}

function SortableFieldItem({
	field,
	index,
	fieldType,
}: SortableFieldItemProps) {
	const isEditing = !!field;
	const isDefault = field?.is_default ?? false;
	const id = useId(String(field?.id));
	const editFieldMutation = useEditFieldMutation();

	const versionNumberRef = useRef(field?.version_number);
	useEffect(() => {
		versionNumberRef.current = field?.version_number;
	}, [field?.version_number]);

	const form = useFormEditorForm({
		mode: "uncontrolled",
		initialValues: {
			name: field?.name,
			type: field?.type.name,
			options: field?.options,
			is_required: field?.is_required,
		},
		validate: {
			name: isNotEmpty("Field name is required"),
			type: isNotEmpty("Field type is required"),
		},
		validateInputOnBlur: true,
		validateInputOnChange: true,
		onValuesChange: useDebouncedCallback((values: FieldFormValues) => {
			if (hasValidationErrors(values)) return;
			if (!isEditing) return;

			editFieldMutation.mutate(
				{
					data: {
						...values,
						options: removeTrailingEmptyOption(values.options),
						version_number: versionNumberRef.current,
					},
					id: Number(id),
					type: fieldType,
				},
				{
					onSuccess: ({ data }) =>
						(versionNumberRef.current = data.version_number),
					onError: (error) => showToastError(error, "Failed to update field"),
				},
			);
		}, 2000),
	});

	const [element, setElement] = useState<HTMLElement | null>(null);
	const handleRef = useRef<HTMLDivElement | null>(null);
	useSortable({
		id,
		index,
		element,
		handle: handleRef,
		disabled: isDefault,
	});

	return (
		<Paper
			ref={setElement}
			radius="sm"
			p="sm"
			bg="rgba(237, 240, 246, 1)"
			style={{
				borderLeft: isDefault
					? undefined
					: "3px solid var(--mantine-color-primary-8)",
			}}
		>
			<FormEditorFormProvider form={form}>
				<FieldProvider field={field}>
					<form>
						<Group>
							<Stack gap="sm" flex={1}>
								<FieldRenderer />
							</Stack>
							<Center
								w={32}
								h={32}
								ref={handleRef}
								style={{ cursor: isDefault ? "not-allowed" : "grab" }}
							>
								<IconGripVertical size={16} color="gray" />
							</Center>
						</Group>
					</form>
				</FieldProvider>
			</FormEditorFormProvider>
		</Paper>
	);
}

export default memo(SortableFieldItem);
