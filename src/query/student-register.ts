
import { mutationOptions, queryOptions } from "@tanstack/react-query";

import {
    fetchPersonalInfoField,
    fetchMedicalHistoryField,
    registerStudent,
    updatePersonalInfo,
    updateMedicalHistory,
} from "@/api/student-register";

import type {
    RegisterReqBody,
    RegisterResBody,
} from "@/types/student-register";

export const studentRegisterQueries = {
    all: () => ["student-register"],

    personalInfo: () =>
        queryOptions({
            queryKey: [...studentRegisterQueries.all(), "personal-info-field"],
            queryFn: fetchPersonalInfoField,
        }),

    medicalHistory: () =>
        queryOptions({
            queryKey: [...studentRegisterQueries.all(), "medical-history-field"],
            queryFn: fetchMedicalHistoryField,
        }),

    register: () =>
        mutationOptions<RegisterResBody, Error, RegisterReqBody>({
            mutationFn: registerStudent,
            onSuccess: ({ data }) => console.log(data),
        }),

    updatePersonalInfo: (studentId: number) =>
        mutationOptions({
            mutationKey: [...studentRegisterQueries.all(), "update-personal-info"],
            mutationFn: (payload?: any) => updatePersonalInfo(studentId, payload),
        }),

        updateMedicalHistory: (studentId: number) =>
        mutationOptions({
            mutationKey: [...studentRegisterQueries.all(), "update-medical-history"],
            mutationFn: (payload?: any) => updateMedicalHistory(studentId, payload),
        }),
};
