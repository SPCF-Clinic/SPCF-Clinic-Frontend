// import { ActionIcon } from "@mantine/core";
// import { IconTrash } from "@tabler/icons-react";
// import { useDeleteField } from "@/hooks/fields/useDeleteField";
// import { useFieldContext } from "../contexts/useFieldContext";
import FormField from "./FormField";

export default function DividerField() {
	// const { field, fieldType } = useFieldContext();
	// const { handleDeleteField, deleteFieldMutation } = useDeleteField({
	// 	fieldType,
	// 	id: field.id,
	// 	version_number: field.version_number,
	// });

	return (
		<FormField>
			{/*{!field.is_default && (
				<ActionIcon
					style={{ alignSelf: "flex-end" }}
					variant="transparent"
					aria-label="Delete field"
					color="gray.9"
					size="sm"
					disabled={field.is_default}
					loading={deleteFieldMutation.isPending}
					onClick={handleDeleteField}
				>
					<IconTrash />
				</ActionIcon>
			)}*/}
		</FormField>
	);
}
