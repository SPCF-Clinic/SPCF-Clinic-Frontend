import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkInQueries } from "@/query/check-ins";
import { bedQueries } from "@/query/beds";
import { dashboardQueries } from "@/query/dashboard";
import { showToastError } from "@/utils/toastError";

export function useResumeBedTimer(checkInId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    ...checkInQueries.resumeBedTimer(checkInId),

    onError: (error) => {
      showToastError(error, "Failed to resume the timer.");
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: checkInQueries.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: bedQueries.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: dashboardQueries.dashboard().queryKey,
      });
    },
  });
}
