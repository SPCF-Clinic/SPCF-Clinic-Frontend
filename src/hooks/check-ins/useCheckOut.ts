import { useMutation, useQueryClient } from "@tanstack/react-query";

import { checkInQueries } from "@/query/check-ins";
import { dashboardQueries } from "@/query/dashboard";

export function useCheckOutStudent(id: number) {
    const queryClient = useQueryClient();

    return useMutation({
        ...checkInQueries.checkOut(id),

        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: checkInQueries.lists(),
            });

            queryClient.invalidateQueries({
                queryKey: checkInQueries.detail(id).queryKey,
            });

                queryClient.invalidateQueries({
                    queryKey: dashboardQueries.dashboard().queryKey,
                });
        },
    });
}