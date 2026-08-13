import { apiClient } from "./axios";

import type { PersonalInfoApiResponse, MedicalHistoryResponse } from "../types/register.form.field"

export function fetchPersonalInfoField(){
    const response = apiClient.get<PersonalInfoApiResponse>(`/personal-info-fields`)

    return response
}

export function fetchMedicalHistoryField(){
    const response = apiClient.get<MedicalHistoryResponse>(`/medical-history-fields`)

    console.log(response)

    return response
}