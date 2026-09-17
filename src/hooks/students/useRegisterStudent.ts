import { useQuery, useMutation } from "@tanstack/react-query";

import { studentRegisterQueries } from "@/query/student-register";

export function usePersonalInfo() {
    return useQuery(studentRegisterQueries.personalInfo());
}

export function useMedicalInfo() {
    return useQuery(studentRegisterQueries.medicalHistory());
}

export function useRegisterUser() {
    return useMutation(studentRegisterQueries.register());
}

export function useUpdatePersonalInfo(studentId: number) {
    return useMutation(studentRegisterQueries.updatePersonalInfo(studentId));
}

export function useUpdateMedicalHistory(studentId: number) {
    return useMutation(studentRegisterQueries.updateMedicalHistory(studentId));
}