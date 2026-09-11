import type { FieldType } from "@/api/fields";
import { FIELD_TYPES } from "@/constants/fields";
import type { FormField } from "@/types/student-register";
import { useCreateFieldMutation } from "./useCreateFieldMutation";
import { useDeleteFieldMutation } from "./useDeleteFieldMutation";

const defaultValues = {
	name: "Question",
	type: FIELD_TYPES.filter((fieldType) => fieldType !== "Divider")[0],
	options: [],
	is_required: false,
};

interface UseNestedFieldsProps {
	type: FieldType;
	parentField: FormField;
	option: string;
}

export function useNestedFields({
	type,
	parentField,
	option,
}: UseNestedFieldsProps) {
	const createFieldMutation = useCreateFieldMutation();
	const deleteFieldMutation = useDeleteFieldMutation();

	const siblings =
		parentField.additional_fields?.filter(
			(f) => f.required_with_field_value === option,
		) ?? [];

	const handleAddNestedField = () => {
		createFieldMutation.mutate(
			{
				type,
				data: {
					...defaultValues,
					form_order: parentField.form_order + 1,
					required_with_field_id: parentField.id,
					required_with_field_value: option,
				},
			},
			{
				onSuccess: ({ data }) => {
					console.log("Nested field created successfully", data);
				},
			},
		);
	};

	const handleRemoveNestedFields = async () => {
		await Promise.all(
			siblings.map((sibling) =>
				deleteFieldMutation.mutateAsync({
					type,
					id: sibling.id,
					data: { version_number: sibling.version_number },
				}),
			),
		);
	};

	return {
		handleAddNestedField,
		createFieldMutation,
		handleRemoveNestedFields,
		deleteFieldMutation,
	};
}
