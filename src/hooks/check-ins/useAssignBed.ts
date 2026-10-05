import { useMutation, useQueryClient } from "@tanstack/react-query";

import { assignBed, type AssignBedPayload } from "@/api/check-ins";
import { invalidateBedData } from "@/query/invalidateBedData";

export function useAssignBed() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      checkInId,
      ...payload
    }: { checkInId: number } & AssignBedPayload) => assignBed(checkInId, payload),
    onSuccess: () => invalidateBedData(queryClient),
  });
}
