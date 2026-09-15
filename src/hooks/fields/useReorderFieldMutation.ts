import { useMutation } from "@tanstack/react-query";

import { reorderField } from "@/api/fields";
import { FIELD_QUERY_KEY } from "@/query/fields";
import type { FormApiResponse } from "@/types/api";
import type { FormField } from "@/types/student-register";

export function useReorderFieldMutation() {
  return useMutation({
    mutationFn: reorderField,
    onMutate: async ({ type, data }, context) => {
      const queryKey = FIELD_QUERY_KEY[type];
      await context.client.cancelQueries({ queryKey });

      const previousFields =
        context.client.getQueryData<FormApiResponse<FormField[]>>(queryKey);

      const orderById = new Map(
        data.fields.map(({ field_id, form_order }) => [field_id, form_order]),
      );

      context.client.setQueryData<FormApiResponse<FormField[]>>(
        queryKey,
        (currentData) => {
          if (!currentData) return currentData;

          const updatedFields = currentData.data
            .map((field) => {
              const formOrder = orderById.get(field.id);

              return {
                ...field,
                form_order: formOrder ?? field.form_order,

                additional_fields: field.additional_fields.map(
                  (additionalField) => ({
                    ...additionalField,
                    form_order:
                      orderById.get(additionalField.id) ??
                      additionalField.form_order,
                  }),
                ),
              };
            })
            .sort((a, b) => a.form_order - b.form_order);

          return {
            ...currentData,
            data: updatedFields,
          };
        },
      );

      return { previousFields };
    },
    onError: (_error, { type }, onMutateResult, context) => {
      context.client.setQueryData(
        FIELD_QUERY_KEY[type],
        onMutateResult?.previousFields,
      );
    },
    onSettled: (_data, _error, { type }, _onMutateResult, context) => {
      context.client.invalidateQueries({
        queryKey: FIELD_QUERY_KEY[type],
      });
    },
  });
}
