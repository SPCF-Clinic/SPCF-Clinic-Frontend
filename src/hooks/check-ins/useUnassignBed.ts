import { useMutation, useQueryClient } from "@tanstack/react-query";

import { checkInQueries } from "@/query/check-ins";
import { invalidateBedData } from "@/query/invalidateBedData";
import { showToastError } from "@/utils/toastError";

export function useUnassignBed(checkInId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    ...checkInQueries.unassignBed(checkInId),
    onSuccess: () => invalidateBedData(queryClient),

    onError: (error) => {
      showToastError(error, "Failed to unassign from bed.");
    },
  });
}
