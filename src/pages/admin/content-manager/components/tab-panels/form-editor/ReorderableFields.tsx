import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import { Button, Group, Stack } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import type { FieldType } from "@/api/fields";
import { useCreateField } from "@/hooks/fields/useCreateField";
import { useReorderFieldMutation } from "@/hooks/fields/useReorderFieldMutation";
import { FIELD_QUERY_KEY } from "@/query/fields";
import type { FormApiResponse } from "@/types/api";
import type { FormField } from "@/types/student-register";
import SortableFieldItem from "./SortableFieldItem";
import { calculateReorderPayload } from "./utils";

interface ReorderableFieldsProps {
	fields: FormField[];
	type: FieldType;
}

export default function ReorderableFields({
	fields,
	type,
}: ReorderableFieldsProps) {
	const queryClient = useQueryClient();
	const reorderMutation = useReorderFieldMutation();

	const { handleAddField, createFieldMutation } = useCreateField({
		fields,
		type,
	});

	const [pendingOrder, setPendingOrder] = useState<number[] | null>(null);

	const isDirty = pendingOrder !== null;

	const displayFields = useMemo(() => {
		if (!pendingOrder) return fields;

		const byId = new Map(fields.map((f) => [f.id, f]));
		return pendingOrder
			.map((id) => byId.get(id))
			.filter((f): f is FormField => Boolean(f));
	}, [fields, pendingOrder]);

	const handleDragEnd = ({ operation }: DragEndEvent) => {
		const { source, canceled } = operation;

		if (canceled || !isSortable(source)) return;

		const { initialIndex, index: targetIndex } = source;
		if (initialIndex === targetIndex) return;

		setPendingOrder((current) => {
			const base = current ?? displayFields.map((f) => f.id);
			const next = [...base];
			const [moved] = next.splice(initialIndex, 1);
			if (moved === undefined) return current;
			next.splice(targetIndex, 0, moved);
			return next;
		});
	};

	const handleSaveOrder = () => {
		if (!pendingOrder) return;

		const payload = calculateReorderPayload(displayFields);
		if (payload.length === 0) return;

		const cached = queryClient.getQueryData<FormApiResponse<FormField[]>>(
			FIELD_QUERY_KEY[type],
		);

		if (!cached?.form_version) return;

		reorderMutation.mutate(
			{
				type,
				data: {
					fields: payload,
					form_version: cached.form_version,
				},
			},
			{
				onSuccess: () => setPendingOrder(null),
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
						disabled={reorderMutation.isPending}
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

				<Group grow>
					<Button variant="transparent" disabled bdrs="xl" size="md">
						Preview
					</Button>
					<Button
						disabled={!isDirty}
						onClick={handleSaveOrder}
						loading={reorderMutation.isPending}
						bdrs="xl"
						size="md"
					>
						Save Order
					</Button>
				</Group>
			</Stack>
		</DragDropProvider>
	);
}
