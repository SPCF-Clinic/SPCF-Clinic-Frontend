import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkInQueries } from "@/query/check-ins";
import { bedQueries } from "@/query/beds";
import { dashboardQueries } from "@/query/dashboard";

export function useResumeBedTimer(bedId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        ...checkInQueries.resumeBedTimer(bedId),

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