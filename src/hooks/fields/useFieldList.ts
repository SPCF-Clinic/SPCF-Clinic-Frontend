import { useQuery } from "@tanstack/react-query";

import type { FieldType } from "@/api/fields";
import {
  medicalHistoryFieldQueries,
  personalInfoFieldQueries,
} from "@/query/fields";

export function useFieldList(type: FieldType) {
  return useQuery(
    type === "Personal"
      ? personalInfoFieldQueries.list()
      : medicalHistoryFieldQueries.list(),
  );
}
