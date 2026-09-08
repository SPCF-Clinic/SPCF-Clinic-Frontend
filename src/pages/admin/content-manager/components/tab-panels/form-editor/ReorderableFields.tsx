import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import { Button, Stack } from "@mantine/core";

import type { FieldType } from "@/api/fields";
import { useReorderFieldMutation } from "@/hooks/fields/useReorderFieldMutation";
import type { FormField } from "@/types/student-register";
import { showToastError } from "@/utils/toastError";
import EditSortableFieldItem from "./sortable-field-item/EditSortableFieldItem";

interface ReorderableFieldsProps {
	fields: FormField[];
	formVersion: string;
	type: FieldType;
}

const calculateTargetFormOrder = (fields: FormField[], targetIndex: number) => {
	return (
		fields
			.slice(0, targetIndex)
			.reduce(
				(total, field) => total + 1 + (field.additional_fields?.length ?? 0),
				0,
			) + 1
	);
};

export default function ReorderableFields({
	fields,
	formVersion,
	type,
}: ReorderableFieldsProps) {
	const reorderFieldMutation = useReorderFieldMutation();

	const handleDragEnd = ({ operation }: DragEndEvent) => {
		const { source, canceled } = operation;

		if (canceled || !isSortable(source)) return;

		const { initialIndex, index: targetIndex } = source;
		if (initialIndex === targetIndex) return;

		const nextFields = [...fields];
		const [movedField] = nextFields.splice(initialIndex, 1);
		if (!movedField) return;
		nextFields.splice(targetIndex, 0, movedField);

		const target_form_order = calculateTargetFormOrder(nextFields, targetIndex);

		reorderFieldMutation.mutate(
			{
				type,
				data: {
					field_id: Number(source.id),
					target_form_order,
					form_version: formVersion,
				},
				previousIndex: initialIndex,
				targetIndex,
			},
			{
				onSuccess: () => {
					console.log("Field reordered successfully");
				},
				onError: (error) => showToastError(error, "Failed to reorder field"),
			},
		);
	};

	return (
		<DragDropProvider onDragEnd={handleDragEnd}>
			<Stack>
				{fields.map((field, index) => (
					<EditSortableFieldItem
						fieldType={type}
						field={field}
						key={field.id}
						index={index}
					/>
				))}

				<Button fs="italic" c="gray.7" variant="transparent" fullWidth>
					+ Add Field
				</Button>
			</Stack>
		</DragDropProvider>
	);
}
