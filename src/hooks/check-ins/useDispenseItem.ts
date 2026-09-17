import { useMutation } from "@tanstack/react-query";
import { putDispenseItem } from "@/api/check-ins";

export const useDispenseItem = () => {
  return useMutation({
    mutationFn: ({ id, payload }: { id:  number; payload: any }) =>
       putDispenseItem(id, payload)
  });
};