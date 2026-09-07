import { useMutation, useQuery } from "@tanstack/react-query";

import type {
	RegisterReqBody,
	RegisterResBody,
} from "@/types/student-register";
import { registerStudent } from "../api/student-register";
import { medicalHistoryFieldQueries, personalInfoFieldQueries } from "./fields";

export function usePersonalInfo() {
	return useQuery(personalInfoFieldQueries.list());
}

export function useMedicalInfo() {
	return useQuery(medicalHistoryFieldQueries.list());
}

export function useRegisterUser() {
	return useMutation<RegisterResBody, Error, RegisterReqBody>({
		mutationFn: registerStudent,
		onSuccess: ({ data }) => console.log(data),
	});
}
