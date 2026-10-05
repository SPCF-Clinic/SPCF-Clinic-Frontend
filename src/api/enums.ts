import { apiClient } from "@/services/axios";
import type { CheckInIndex } from "@/types/check-ins";

/** Check-ins that are still waiting to be given a bed. */
export const getAssignableCheckIns = () =>
  apiClient.get<CheckInIndex[]>("/enums/check-ins");
