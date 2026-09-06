export const FIELD_TYPE_SELECT_DATA = [
	{ value: "Divider", label: "Divider" },
	{ value: "Short Text", label: "Short answer" },
	{ value: "Long Text", label: "Long Answer" },
	{ value: "Checkbox", label: "Checkbox" },
	{ value: "Dropdown", label: "Dropdown" },
	{ value: "Date", label: "Date" },
	{ value: "Radio", label: "Radio" },
] as const;

export const FIELD_TYPES = FIELD_TYPE_SELECT_DATA.map(({ value }) => value);
export type FieldTypeName = (typeof FIELD_TYPES)[number];
