import { apiClient } from "../services/axios";

import type { StudentData, PersonalInfoQueryParams, MedicalHistoryQueryParams} from "@/types/student-dashboard";



export async function fetchStudent(student_number : number) {
  const response = await apiClient.get<StudentData>(`students/${student_number}`);
  return response;
}

export async function updatePersonalInfo(student_number : number, request : PersonalInfoQueryParams ) {
  const response = await apiClient.put(`students/${student_number}/personal-info`, null, {
    params: request,
  });
  return response.data;
}

export async function updateMedicalHistory(student_number : number, request : MedicalHistoryQueryParams ) {
  const response = await apiClient.put(`students/${student_number}/medical-history`, null, {
    params: request,
  });
  return response.data;
}