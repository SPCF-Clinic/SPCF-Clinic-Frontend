import Pusher from "pusher-js";

import { useAuthStore } from "@/stores/useAuthStore";

const pusherKey = import.meta.env.VITE_PUSHER_APP_KEY;
const pusherCluster = import.meta.env.VITE_PUSHER_APP_CLUSTER;

if (!pusherKey) {
  throw new Error("Missing VITE_PUSHER_APP_KEY");
}

if (!pusherCluster) {
  throw new Error("Missing VITE_PUSHER_APP_CLUSTER");
}

export const pusher = new Pusher(pusherKey, {
  cluster: pusherCluster,

  channelAuthorization: {
    endpoint: `${import.meta.env.VITE_API_URL}/api/broadcasting/auth`,
    transport: "ajax",
    headersProvider: () => {
      const token = useAuthStore.getState().token;
      return {
        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),
        Accept: "application/json",
      };
    },
  },
});
