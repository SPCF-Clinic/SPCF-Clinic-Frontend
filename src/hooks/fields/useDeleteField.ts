import type { FieldType } from "@/api/fields";
import { toast } from "@/components/toast";
import { showToastError } from "@/utils/toastError";
import { useDeleteFieldMutation } from "./useDeleteFieldMutation";

interface UseDeleteFieldProps {
	fieldType: FieldType;
	id: number;
	version_number: number;
}

export function useDeleteField({
	fieldType,
	id,
	version_number,
}: UseDeleteFieldProps) {
	const deleteFieldMutation = useDeleteFieldMutation();

	const handleDeleteField = () => {
		deleteFieldMutation.mutate(
			{
				type: fieldType,
				id,
				data: { version_number },
			},
			{
				onSuccess: () => {
					toast.success({ message: "Field deleted successfully" });
				},
				onError: (error) => showToastError(error, "Failed to delete field"),
			},
		);
	};

	return { handleDeleteField, deleteFieldMutation };
}
