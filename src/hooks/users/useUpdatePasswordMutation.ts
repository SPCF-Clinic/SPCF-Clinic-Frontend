import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateUserPassword } from "@/api/users";
import { studentQueries } from "@/query/students";

export function useUpdatePasswordMutation(userId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (password: string) => updateUserPassword(userId, password),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: studentQueries.detail(userId).queryKey,
      });
    },
  });
}
