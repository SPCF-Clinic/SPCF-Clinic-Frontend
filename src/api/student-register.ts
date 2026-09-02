import { apiClient } from "../services/axios";

import type {
  PersonalInfoApiResponse,
  MedicalHistoryResponse,
  RegisterReqBody,
} from "../types/student-register";

export function fetchPersonalInfoField() {
  const response = apiClient.get<PersonalInfoApiResponse>(
    `/personal-info-fields`,
  );

  return response;
}

export function fetchMedicalHistoryField() {
  const response = apiClient.get<MedicalHistoryResponse>(
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
