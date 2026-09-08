import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import { Button, Stack } from "@mantine/core";

import type { FieldType } from "@/api/fields";
import { useCreateField } from "@/hooks/fields/useCreateField";
import { useReorderFieldMutation } from "@/hooks/fields/useReorderFieldMutation";
import type { FormField } from "@/types/student-register";
import { showToastError } from "@/utils/toastError";
import SortableFieldItem from "./SortableFieldItem";
import { calculateFormOrder } from "./utils";

interface ReorderableFieldsProps {
	fields: FormField[];
	formVersion: string;
	type: FieldType;
}

export default function ReorderableFields({
	fields,
	formVersion,
	type,
}: ReorderableFieldsProps) {
	const reorderFieldMutation = useReorderFieldMutation();
	const { handleAddField, createFieldMutation } = useCreateField({
		fields,
		type,
	});

	const handleDragEnd = ({ operation }: DragEndEvent) => {
		const { source, canceled } = operation;

		if (canceled || !isSortable(source)) return;

		const { initialIndex, index: targetIndex } = source;
		if (initialIndex === targetIndex) return;

		const nextFields = [...fields];
		const [movedField] = nextFields.splice(initialIndex, 1);
		if (!movedField) return;
		nextFields.splice(targetIndex, 0, movedField);

		const target_form_order = calculateFormOrder(nextFields, targetIndex);

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
					<SortableFieldItem
						fieldType={type}
						field={field}
						key={field.id}
						index={index}
					/>
				))}

				<Button
					fs="italic"
					c="gray.7"
					variant="transparent"
					fullWidth
					onClick={handleAddField}
					loading={createFieldMutation.isPending}
				>
					+ Add Field
				</Button>
			</Stack>
		</DragDropProvider>
	);
}
