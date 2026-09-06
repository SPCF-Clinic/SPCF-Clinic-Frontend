import type { FormApiResponse } from "@/types/api";
import { apiClient } from "../services/axios";

import type { FormField, RegisterReqBody } from "../types/student-register";

export function fetchPersonalInfoField() {
	const response = apiClient.get<FormField[], FormApiResponse<FormField[]>>(
		`/personal-info-fields`,
	);

	return response;
}

export function fetchMedicalHistoryField() {
	const response = apiClient.get<FormField[], FormApiResponse<FormField[]>>(
		`/medical-history-fields`,
	);

	return response;
}

export async function registerStudent(request: RegisterReqBody) {
	const response = await apiClient.post(`auth/register`, null, {
		params: request,
	});
	return response.data;
}
