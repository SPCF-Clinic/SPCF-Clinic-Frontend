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

  console.log(response);

  return response;
}

export function fetchMedicalHistoryField() {
  const response = apiClient.get<MedicalHistoryResponse>(
    `/medical-history-fields`,
  );

  console.log(response);

  return response;
}

export function registerStudent(request: RegisterReqBody) {
  const response = apiClient.post(`auth/register`, request);

  console.log(response);

  return response;
}
