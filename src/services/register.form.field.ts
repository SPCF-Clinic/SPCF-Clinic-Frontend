import { apiClient } from "./axios";

import type {
  PersonalInfoApiResponse,
  MedicalHistoryResponse,
  RegisterReqBody,
} from "../types/register.form.field";

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
