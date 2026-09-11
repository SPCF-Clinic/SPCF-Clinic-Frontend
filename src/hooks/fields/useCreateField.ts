import type { FieldType } from "@/api/fields";
import { FIELD_TYPES } from "@/constants/fields";
import {
	calculateFormOrder,
	REQUIRED_OPTION_TYPES,
	removeTrailingEmptyOption,
} from "@/pages/admin/content-manager/components/tab-panels/form-editor/utils";
import type { FormField } from "@/types/student-register";
import { showToastError } from "@/utils/toastError";
import { useCreateFieldMutation } from "./useCreateFieldMutation";

const defaultValues = {
	name: "Question",
	type: FIELD_TYPES[0],
	options: [],
	is_required: false,
};

export function useCreateField({
	fields,
	type,
}: {
	fields: FormField[];
	type: FieldType;
}) {
	const createFieldMutation = useCreateFieldMutation();

	const handleAddField = () => {
		const formOrder = calculateFormOrder(fields, fields.length);

		createFieldMutation.mutate(
			{
				type,
				data: {
					...defaultValues,
					form_order: formOrder,
					options: REQUIRED_OPTION_TYPES.includes(defaultValues.type)
						? removeTrailingEmptyOption(defaultValues.options)
						: undefined,
				},
			},
			{
				onSuccess: ({ data }) => {
					console.log("Field created successfully", data);
				},
				onError: (error) => showToastError(error, "Failed to create field"),
			},
		);
	};

	return { handleAddField, createFieldMutation };
}
