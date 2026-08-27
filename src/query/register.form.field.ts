import { useQuery, useMutation } from "@tanstack/react-query";

import {
  fetchPersonalInfoField,
  fetchMedicalHistoryField,
  registerStudent,
} from "../services/register.form.field";

import type {
  RegisterReqBody,
  RegisterResBody,
} from "@/types/register.form.field";

export function usePersonalInfo() {
  return useQuery({
    queryKey: ["personal-info-field"],
    queryFn: fetchPersonalInfoField,
  });
}

export function useMedicalInfo() {
  return useQuery({
    queryKey: ["medical-history-field"],
    queryFn: fetchMedicalHistoryField,
  });
}

export function useRegisterUser() {
  return useMutation<RegisterResBody, Error, RegisterReqBody>({
    mutationFn: registerStudent,
    onSuccess: ({ data }) => console.log(data),
  });
}
