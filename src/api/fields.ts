import type { FieldTypeName } from "@/constants/fields";
import { apiClient } from "@/services/axios";

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
}

export type FieldType = "Personal" | "Medical";

export const createField = ({
	type,
	data,
}: {
	type: FieldType;
	data: FieldData;
}) => apiClient.post(FIELD_TYPE_URL[type], data);

export const editField = ({
	type,
	id,
	data,
}: {
	type: FieldType;
	id: number;
	data: FieldData;
}) => apiClient.put(`${FIELD_TYPE_URL[type]}/${id}`, data);

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
