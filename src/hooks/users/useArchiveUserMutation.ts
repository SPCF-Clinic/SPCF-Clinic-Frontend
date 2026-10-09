import { useMutation, useQueryClient } from "@tanstack/react-query";

import { archiveUser } from "@/api/users";
import { studentQueries } from "@/query/students";

export function useArchiveUserMutation(userId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { status: "ARCHIVE" | "UNARCHIVE" }) =>
      archiveUser(userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: studentQueries.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: studentQueries.detail(userId).queryKey,
      });
    },
  });
}
