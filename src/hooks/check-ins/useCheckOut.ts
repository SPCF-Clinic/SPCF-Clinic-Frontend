import {useMutation} from "@tanstack/react-query";

import { checkInQueries } from "@/query/check-ins"; 


export function useCheckOutStudent(id: number) {
    return useMutation(checkInQueries.checkOut(id));
}