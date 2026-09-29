import type { FormField } from "@/types/student-register";

/**
 * Normalise a form field's options into the `{ value, label }` shape Mantine's
 * Select / Radio / Checkbox expect. The API returns `FormOption` objects, and
 * `label` is optional, so fall back to the value for display.
 */
export const toSelectOptions = (field: FormField) =>
	field.options.map((option) => ({
		value: option.value,
		label: option.label ?? option.value,
	}));
