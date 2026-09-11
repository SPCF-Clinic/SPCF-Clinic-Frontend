import { useMutation} from "@tanstack/react-query";

import { checkInMuations } from "@/query/beds";

export const useCheckInStudent = () => {
  return useMutation(checkInMuations.post());
}