import { useMutation } from "@tanstack/react-query";
import {
	type FieldType,
	type ReorderFieldVariables,
	reorderField,
} from "@/api/fields";
import type { FormApiResponse } from "@/types/api";
import type { FormField } from "@/types/student-register";

const FIELD_QUERY_KEY = {
	Personal: ["personal-info-field"],
	Medical: ["medical-history-field"],
} satisfies Record<FieldType, unknown[]>;

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
