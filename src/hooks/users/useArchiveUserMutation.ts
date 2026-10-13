import { useMutation, useQueryClient } from "@tanstack/react-query";

import { archiveUser } from "@/api/users";
import { toast } from "@/components/toast";
import { studentQueries } from "@/query/students";
import { showToastError } from "@/utils/toastError";

export function useArchiveUserMutation(userId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { status: "ARCHIVE" | "UNARCHIVE" }) =>
      archiveUser(userId, payload),
    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries({
        queryKey: studentQueries.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: studentQueries.detail(userId).queryKey,
      });
      toast.success({
        message:
          status === "ARCHIVE" ? "Student archived" : "Student unarchived",
      });
    },
    onError: (error, { status }) => {
      showToastError(
        error,
        status === "ARCHIVE"
          ? "Failed to archive student"
          : "Failed to unarchive student",
      );
    },
  });
}
