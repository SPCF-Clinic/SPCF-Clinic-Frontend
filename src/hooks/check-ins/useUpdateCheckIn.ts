import { useMutation, useQueryClient } from "@tanstack/react-query";

import { checkInQueries } from "@/query/check-ins";
import { dashboardQueries } from "@/query/dashboard";
import { bedQueries } from "@/query/beds";

export function useUpdateCheckIn(id: number) {
    const queryClient = useQueryClient();

    return useMutation({
        ...checkInQueries.updateCheckIn(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: checkInQueries.lists(),
            });

            queryClient.invalidateQueries({
                queryKey: checkInQueries.detail(id).queryKey,
            });

            queryClient.invalidateQueries({
                queryKey: dashboardQueries.all(),
            });
            queryClient.invalidateQueries({
                queryKey: bedQueries.all(),
            });
        },
    });
}