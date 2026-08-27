import { useQuery, useMutation } from "@tanstack/react-query";

import { fetchStudent } from "@/api/student-dashboard";


export function useSpecificStudent(student_number:number){
return useQuery({
    queryKey: ["student-details", student_number],
    queryFn: () => fetchStudent({student_number}),
    enabled: !!student_number,
})
}