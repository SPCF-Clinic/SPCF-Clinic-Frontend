import { apiClient } from "../services/axios";

import type {
  PersonalInfoApiResponse,
  MedicalHistoryResponse,
  RegisterReqBody,
} from "../types/student-register";

export function fetchPersonalInfoField(): Promise<PersonalInfoApiResponse> {
  return apiClient.get(`/personal-info-fields`) as unknown as Promise<PersonalInfoApiResponse>;
}

export function fetchMedicalHistoryField(): Promise<MedicalHistoryResponse> {
  return apiClient.get(`/medical-history-fields`) as unknown as Promise<MedicalHistoryResponse>;
}

export async function registerStudent(request: RegisterReqBody) {
  const response = await apiClient.post(`auth/register`, null, {
    params: request,
  });
  return response.data;
}

export const updatePersonalInfo = (studentId: number, payload?: any) =>
	apiClient.put(`/students/${studentId}/personal-info`, undefined ,{
		params: payload,
	});

  export const updateMedicalHistory = (studentId: number, payload?: any) =>
	apiClient.put(`/students/${studentId}/medical-history`, undefined ,{
		params: payload,
	});

