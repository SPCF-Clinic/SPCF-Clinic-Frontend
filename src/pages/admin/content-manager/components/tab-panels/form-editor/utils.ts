import { type FormValidateInput, isNotEmpty } from "@mantine/form";
import type { FormField } from "@/types/student-register";
import type { FieldFormValues } from "./formEditorFormContext";

export const REQUIRED_OPTION_TYPES = ["Dropdown", "Checkbox", "Radio"];

export const validators: FormValidateInput<FieldFormValues> = {
	name: isNotEmpty("Field name is required"),
	type: isNotEmpty("Field type is required"),
	options: (value, values) => {
		if (!REQUIRED_OPTION_TYPES.includes(values.type ?? "")) return null;

		const options = (value as string[] | undefined) ?? [];

		return options.some((option) => option.trim() !== "")
			? null
			: "At least one option is required";
	},
};

export function hasValidationErrors(values: FieldFormValues) {
	for (const [key, validate] of Object.entries(validators)) {
		const value = values[key as keyof FieldFormValues];

		if (validate(value, values) != null) {
			return true;
		}
	}

	return false;
}

export function removeTrailingEmptyOption(options?: string[]) {
	if (options?.at(-1) === "") {
		return options.slice(0, -1);
	}

	return options;
}

export const calculateFormOrder = (
	fields: FormField[],
	targetIndex: number,
) => {
	return (
		fields
			.slice(0, targetIndex)
			.reduce(
				(total, field) => total + 1 + (field.additional_fields?.length ?? 0),
				0,
			) + 1
	);
};
