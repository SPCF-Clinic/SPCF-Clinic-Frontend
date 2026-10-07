import { parseAsStringLiteral, useQueryStates } from "nuqs";

import {
  STUDENT_SORT_KEYS,
  type StudentSortKey,
  type StudentSortOrder,
} from "@/api/students";
import { useStudentPage } from "./useStudentPage";

const SORT_ORDERS = ["asc", "desc"] as const;

/** The student list's `sort_by` / `sort_order` URL params. Both must
 *  be present and valid for the list to be sorted; anything else —
 *  absent, a typo'd key, only one of the two — is treated as
 *  unsorted, matching the endpoint rejecting unknown keys. Parsing an
 *  invalid literal back to null keeps the URL shareable: an edited
 *  URL can never produce a 422. Replaces history, so the back button
 *  does not undo a sort. */
export function useStudentSort() {
  const [{ sort_by, sort_order }, setSortParams] = useQueryStates({
    sort_by: parseAsStringLiteral(STUDENT_SORT_KEYS).withOptions({
      history: "replace",
    }),
    sort_order: parseAsStringLiteral(SORT_ORDERS).withOptions({
      history: "replace",
    }),
  });
  const [page, setPage] = useStudentPage();

  const sort =
    sort_by !== null && sort_order !== null
      ? { by: sort_by, order: sort_order }
      : null;

  const setSort = (by: StudentSortKey, order: StudentSortOrder) => {
    setSortParams({ sort_by: by, sort_order: order });
    // Reset to page 1 in the same synchronous block, so the sort and
    // the reset land in one history entry.
    if (page !== 1) setPage(1);
  };

  return { sort, setSort };
}
