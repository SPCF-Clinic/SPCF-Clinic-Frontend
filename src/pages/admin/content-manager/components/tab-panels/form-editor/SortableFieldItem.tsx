import { useSortable } from "@dnd-kit/react/sortable";
import { Center, Group, Paper, Stack } from "@mantine/core";
import { isNotEmpty } from "@mantine/form";
import { useDebouncedCallback, useId } from "@mantine/hooks";
import { IconGripVertical } from "@tabler/icons-react";
import { memo, useRef, useState } from "react";

import type { FormField } from "@/types/student-register";
import { FieldRenderer } from "./FormField";
import {
	FormEditorFormProvider,
	useFormEditorForm,
} from "./formEditorFormContext";

interface SortableFieldItemProps {
	field?: FormField;
	index: number;
}

function SortableFieldItem({ field, index }: SortableFieldItemProps) {
	const id = useId(String(field?.id));

	const handleSubmit = (values: typeof form.values) => {
		if (Object.keys(form.errors).length > 0) return;
		console.log(values);
	};

	const form = useFormEditorForm({
		mode: "uncontrolled",
		initialValues: {
			name: field?.name,
			type: field?.type.name,
		},
		validate: {
			name: isNotEmpty("Field name is required"),
			type: isNotEmpty("Field type is required"),
		},
		validateInputOnBlur: true,
		validateInputOnChange: true,
		onValuesChange: useDebouncedCallback(handleSubmit, 500),
	});

	const [element, setElement] = useState<HTMLElement | null>(null);
	const handleRef = useRef<HTMLDivElement | null>(null);
	useSortable({ id, index, element, handle: handleRef });

	return (
		<Paper
			ref={setElement}
			radius="sm"
			p="sm"
			bg="rgba(237, 240, 246, 1)"
			style={{
				borderLeft: "3px solid var(--mantine-color-primary-8)",
			}}
		>
			<FormEditorFormProvider form={form}>
				<form>
					<Group>
						<Stack gap="sm" flex={1}>
							<FieldRenderer />
						</Stack>
						<Center w={24} h={24} ref={handleRef}>
							<IconGripVertical size={16} color="gray" />
						</Center>
					</Group>
				</form>
			</FormEditorFormProvider>
		</Paper>
	);
}

export default memo(SortableFieldItem);
