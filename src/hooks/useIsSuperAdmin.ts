import { useAuthStore } from "@/stores/useAuthStore";

export function useIsSuperAdmin() {
  return useAuthStore((state) => state.user?.role === "Super Admin");
}
