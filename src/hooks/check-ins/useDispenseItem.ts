import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkInQueries } from "@/query/check-ins";
import { bedQueries } from "@/query/beds";
import { dashboardQueries } from "@/query/dashboard";
import { activityLogQueries } from "@/query/activity-logs";

export function useDispenseItem() {
  const queryClient = useQueryClient();

  return useMutation({
    ...checkInQueries.dispenseItem(),

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

      // Invalidates all activity log lists
      queryClient.invalidateQueries({
        queryKey: activityLogQueries.lists(),
      });
    },
  });
}