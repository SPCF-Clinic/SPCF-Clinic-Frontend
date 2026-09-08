import { useSortable } from "@dnd-kit/react/sortable";
import { Center, Group, Paper, Stack } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
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
import {
	hasValidationErrors,
	REQUIRED_OPTION_TYPES,
	removeTrailingEmptyOption,
	validators,
} from "./utils";

interface EditSortableFieldItemProps {
	field: FormField;
	index: number;
	fieldType: FieldType;
}

function EditSortableFieldItem({
	field,
	index,
	fieldType,
}: EditSortableFieldItemProps) {
	const isDefault = field.is_default;
	const editFieldMutation = useEditFieldMutation();

	const versionNumberRef = useRef(field.version_number);
	useEffect(() => {
		versionNumberRef.current = field.version_number;
	}, [field.version_number]);

	const form = useFormEditorForm({
		mode: "uncontrolled",
		initialValues: {
			name: field.name,
			type: field.type.name,
			options: field.options,
			is_required: field.is_required,
		},
		validate: validators,
		validateInputOnBlur: true,
		validateInputOnChange: true,
		onValuesChange: useDebouncedCallback((values: FieldFormValues) => {
			if (hasValidationErrors(values)) return;
			const payload = {
				...values,
				options:
					values.type && REQUIRED_OPTION_TYPES.includes(values.type)
						? removeTrailingEmptyOption(values.options)
						: undefined,
				version_number: versionNumberRef.current,
			};

			editFieldMutation.mutate(
				{
					data: payload,
					id: field.id,
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
		id: field.id,
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

export default memo(EditSortableFieldItem);
