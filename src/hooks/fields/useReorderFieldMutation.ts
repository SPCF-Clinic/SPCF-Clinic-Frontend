import { useMutation } from "@tanstack/react-query";

import { type ReorderFieldVariables, reorderField } from "@/api/fields";
import { FIELD_QUERY_KEY } from "@/query/fields";
import type { FormApiResponse } from "@/types/api";
import type { FormField } from "@/types/student-register";

interface MutationFnVariables extends ReorderFieldVariables {
	previousIndex: number;
	targetIndex: number;
}

export function useReorderFieldMutation() {
	return useMutation({
		mutationFn: ({ data, type }: MutationFnVariables) =>
			reorderField({ type, data }),
		onMutate: async ({ type, previousIndex, targetIndex }, context) => {
			const queryKey = FIELD_QUERY_KEY[type];
			await context.client.cancelQueries({ queryKey });

			const previousFields =
				context.client.getQueryData<FormApiResponse<FormField[]>>(queryKey);

			context.client.setQueryData<FormApiResponse<FormField[]>>(
				queryKey,
				(currentData) => {
					if (!currentData) return currentData;

					const fields = [...currentData.data];
					const [movedField] = fields.splice(previousIndex, 1);
					if (!movedField) return currentData;

					fields.splice(targetIndex, 0, movedField);

					return { ...currentData, data: fields };
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
		onSettled: async (_data, _error, { type }, _onMutateResult, context) => {
			context.client.invalidateQueries({
				queryKey: FIELD_QUERY_KEY[type],
			});
		},
	});
}
