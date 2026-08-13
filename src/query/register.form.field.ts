import { useQuery } from "@tanstack/react-query";

import { fetchPersonalInfoField, fetchMedicalHistoryField } from "../services/register.form.field";

export function usePersonalInfo(){
     return useQuery({
        queryKey:["personal-info-field"],
        queryFn: fetchPersonalInfoField,
     })
}

export function useMedicalInfo(){
   return useQuery({
      queryKey:["medical-hostory-field"],
      queryFn: fetchMedicalHistoryField
   })
}