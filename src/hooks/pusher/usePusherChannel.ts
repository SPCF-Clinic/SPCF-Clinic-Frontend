import { pusher } from "@/services/pusher";
import { useEffect, useRef } from "react";

export function usePusherChannel<T>(
  channelName: string | null,
  eventName: string,
  handler: (data: T) => void,
  enabled = true,
) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!channelName || !enabled) {
      return;
    }

    const channel = pusher.subscribe(channelName);

    const listener = (data: T) => {
      handlerRef.current(data);
    };

    channel.bind(eventName, listener);

    return () => {
      channel.unbind(eventName, listener);
      pusher.unsubscribe(channelName);
    };
  }, [channelName, eventName, enabled]);
}
