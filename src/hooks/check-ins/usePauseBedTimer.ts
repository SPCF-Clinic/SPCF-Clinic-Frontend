import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { checkInQueries } from "@/query/check-ins";
import { bedQueries } from "@/query/beds";
import { dashboardQueries } from "@/query/dashboard";
import { dayjs } from "@/services/dayjs";
import type { ApiResponse, CursorPaginationResponse } from "@/types/api";
import type { BedIndex } from "@/types/beds";
import { showToastError } from "@/utils/toastError";

type BedsListData = InfiniteData<
  ApiResponse<CursorPaginationResponse<BedIndex>>
>;

export function usePauseBedTimer(checkInId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    ...checkInQueries.pauseBedTimer(checkInId),

    onMutate: async () => {
      const pausedAt = dayjs().format("YYYY-MM-DD HH:mm:ss");

      await queryClient.cancelQueries({ queryKey: bedQueries.lists() });

      const previous = queryClient.getQueriesData<BedsListData>({
        queryKey: bedQueries.lists(),
      });

      queryClient.setQueriesData<BedsListData>(
        { queryKey: bedQueries.lists() },
        (old) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page) => {
              const beds = page.data.data;

              if (!beds.some((bed) => bed.check_in_id === checkInId)) {
                return page;
              }

              return {
                ...page,
                data: {
                  ...page.data,
                  data: beds.map((bed) =>
                    bed.check_in_id === checkInId
                      ? { ...bed, timer_paused_at: pausedAt }
                      : bed,
                  ),
                },
              };
            }),
          };
        },
      );

      return { previous };
    },

    onError: (error, _variables, context) => {
      context?.previous.forEach(([queryKey, data]) => {
        if (data !== undefined) queryClient.setQueryData(queryKey, data);
      });

      showToastError(error, "Failed to pause the timer.");
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
