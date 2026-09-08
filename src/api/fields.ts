import type { FieldTypeName } from "@/constants/fields";
import type { FieldFormValues } from "@/pages/admin/content-manager/components/tab-panels/form-editor/formEditorFormContext";
import { apiClient } from "@/services/axios";
import type { FormField } from "@/types/student-register";

const FIELD_TYPE_URL = {
	Personal: "/personal-info-fields",
	Medical: "/medical-history-fields",
} satisfies Record<FieldType, string>;

export interface FieldData {
	name: string;
	type: FieldTypeName;
	description_text?: string;
	is_required?: boolean;
	required_with_field_id?: number;
	required_with_field_value?: string;
	form_order: number;
	options?: string[];
	version_number: number;
}

export type FieldType = "Personal" | "Medical";

export const createField = ({
	type,
	data,
}: {
	type: FieldType;
	data: FieldFormValues;
}) => apiClient.post<FormField>(FIELD_TYPE_URL[type], data);

export const editField = ({
	type,
	id,
	data,
}: {
	type: FieldType;
	id: number;
	data: FieldFormValues;
}) => apiClient.put<FormField>(`${FIELD_TYPE_URL[type]}/${id}`, data);

interface ReorderFieldData {
	field_id: number;
	target_form_order: number;
	form_version: string;
}

export interface ReorderFieldVariables {
	type: FieldType;
	data: ReorderFieldData;
}
export const reorderField = ({ type, data }: ReorderFieldVariables) =>
	apiClient.post(`${FIELD_TYPE_URL[type]}/reorder`, data);

export const deleteField = ({
	type,
	id,
	data,
}: {
	type: FieldType;
	id: number;
	data: { version_number: number };
}) => apiClient.delete(`${FIELD_TYPE_URL[type]}/${id}`, { data });
