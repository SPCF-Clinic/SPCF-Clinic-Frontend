import { useQueryClient } from "@tanstack/react-query";

import { bedQueries } from "@/query/beds";
import { studentQueries } from "@/query/students";
import { useAuthStore } from "@/stores/useAuthStore";
import { usePusherChannel } from "../pusher/usePusherChannel";

export function useTimerRealtime() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const queryClient = useQueryClient();

  const invalidateTimerQueries = () => {
    queryClient.invalidateQueries({
      queryKey: bedQueries.lists(),
    });

    queryClient.invalidateQueries(studentQueries.detailsOnly());
  };

  usePusherChannel("private-beds", "timer.started", invalidateTimerQueries, isAuthenticated);
  usePusherChannel("private-beds", "timer.paused", invalidateTimerQueries, isAuthenticated);
  usePusherChannel("private-beds", "timer.resumed", invalidateTimerQueries, isAuthenticated);
  usePusherChannel("private-beds", "timer.adjusted", invalidateTimerQueries, isAuthenticated);
  usePusherChannel("private-beds", "timer.removed", invalidateTimerQueries, isAuthenticated);
}
