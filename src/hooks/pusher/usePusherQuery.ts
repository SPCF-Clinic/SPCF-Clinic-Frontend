import { useQueryClient } from "@tanstack/react-query";

import { usePusherChannel } from "./usePusherChannel";

interface UsePusherQueryOptions<TEvent> {
  channelName: string | null;
  eventName: string;
  enabled?: boolean;

  onEvent: (
    event: TEvent,
    queryClient: ReturnType<typeof useQueryClient>,
  ) => void;
}

export function usePusherQuery<TEvent>({
  channelName,
  eventName,
  enabled = true,
  onEvent,
}: UsePusherQueryOptions<TEvent>) {
  const queryClient = useQueryClient();

  usePusherChannel<TEvent>(
    channelName,
    eventName,
    (event) => {
      onEvent(event, queryClient);
    },
    enabled,
  );
}
