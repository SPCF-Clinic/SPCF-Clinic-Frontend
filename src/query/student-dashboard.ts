import { useQuery, useMutation } from "@tanstack/react-query";

import { fetchStudent, updatePersonalInfo } from "@/api/student-dashboard";

import type {
  PersonalInfoQueryParams,
  MedicalHistoryQueryParams,
} from "@/types/student-dashboard";

export function useSpecificStudent(student_number: number) {
  return useQuery({
    queryKey: ["student-details", student_number],
    queryFn: () => fetchStudent(student_number),
    enabled: !!student_number,
  });
}

export function useUpdatePersonalInfo() {
  return useMutation<
    unknown,
    Error,
    { student_number: number; request: PersonalInfoQueryParams }
  >({
    mutationFn: ({ student_number, request }) =>
      updatePersonalInfo(student_number, request),
    onSuccess: (data, variables) => {
      console.log("Update Success Response:", data);
        console.log("Variables", variables)
    },
    onError: (error) => {
      console.error("Update Personal Info Failed:", error);
    },
  });
}

export function useUpdateMedicalHistory() {
  return useMutation<
    unknown,
    Error,
    { student_number: number; request: MedicalHistoryQueryParams }
  >({
    mutationFn: ({ student_number, request }) =>
      updatePersonalInfo(student_number, request),
    onSuccess: (data, variables) => {
      console.log("Update Success Response:", data);
      console.log("Variables", variables)
    },
    onError: (error) => {
      console.error("Update Personal Info Failed:", error);
    },
  });
}
