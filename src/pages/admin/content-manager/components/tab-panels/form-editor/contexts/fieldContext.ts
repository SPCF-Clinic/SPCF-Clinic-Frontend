import { createContext } from "react";

import type { FieldType } from "@/api/fields";
import type { AdditionalField, FormField } from "@/types/student-register";

export type RenderableField = FormField | AdditionalField;

export interface FieldContextValue {
	field: RenderableField;
	fieldType: FieldType;
	isDefault: boolean;
}

export const FieldContext = createContext<FieldContextValue | null>(null);

export function isNestedField(
	field: RenderableField,
): field is AdditionalField {
	return "required_with_field_value" in field;
}

export function isParentField(field: RenderableField): field is FormField {
	return !isNestedField(field);
}
