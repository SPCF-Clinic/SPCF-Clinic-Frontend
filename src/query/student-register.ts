import { useMutation, useQuery } from "@tanstack/react-query";

import type {
	RegisterReqBody,
	RegisterResBody,
} from "@/types/student-register";
import {
	fetchMedicalHistoryField,
	fetchPersonalInfoField,
	registerStudent,
} from "../api/student-register";

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
