import { useQueryClient } from "@tanstack/react-query";

import { bedQueries } from "@/query/beds";
import { useAuthStore } from "@/stores/useAuthStore";
import { dashboardQueries } from "@/query/dashboard";
import { usePusherChannel } from "../pusher/usePusherChannel";

export function useDashboardRealtime() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const queryClient = useQueryClient();

  const invalidateDashboardQueries = () => {
    queryClient.invalidateQueries({
      queryKey: bedQueries.lists(),
    });

    queryClient.invalidateQueries({ queryKey: dashboardQueries.all() });
  };

  usePusherChannel(
    "private-dashboard",
    "check-in.created",
    invalidateDashboardQueries,
    isAuthenticated,
  );
  usePusherChannel(
    "private-dashboard",
    "check-in.checked-out",
    invalidateDashboardQueries,
    isAuthenticated,
  );
}
