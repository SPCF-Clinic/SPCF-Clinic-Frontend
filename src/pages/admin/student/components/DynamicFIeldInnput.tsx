import type { PersonalInfoField, MedicalHistoryField } from "@/types/student-register";

export type DynamicField = PersonalInfoField | MedicalHistoryField;

export type FormValues = Record<string, string | string[]>;

export function getOptions(field: DynamicField) {
	return field.options.map((option: any) => {
		if (typeof option === "string") {
			return {
				value: option,
				label: option,
			};
		}

		const optionValue = option as {
			id?: number | string;
			value?: string;
		};

		const value = optionValue.value ?? String(optionValue.id ?? "");

		return {
			value,
			label: value,
		};
	});
}

export function getInitialValue(
	field: DynamicField,
	value: string | string[],
): string | string[] {
	if (field.type.name === "Checkbox") {
		return Array.isArray(value) ? value : value ? [value] : [];
	}

	return Array.isArray(value) ? value[0] ?? "" : value;
}