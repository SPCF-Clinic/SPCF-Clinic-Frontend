import { useMutationState } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import type { EditFieldVariables } from "@/api/fields";
import { EDIT_FIELD_MUTATION_KEY } from "./useEditFieldMutation";

const SUCCESS_INDICATOR_DURATION_MS = 2000;

function useSuccessIndicator(active: boolean) {
	const [prevActive, setPrevActive] = useState(active);
	const [visible, setVisible] = useState(active);

	if (active !== prevActive) {
		setPrevActive(active);
		setVisible(active);
	}

	useEffect(() => {
		if (!visible) {
			return;
		}

		const timeout = setTimeout(() => {
			setVisible(false);
		}, SUCCESS_INDICATOR_DURATION_MS);

		return () => clearTimeout(timeout);
	}, [visible]);

	return visible;
}

export function useFieldSaveIndicator(fieldId: number) {
	const statuses = useMutationState({
		filters: {
			mutationKey: EDIT_FIELD_MUTATION_KEY,
			predicate: (mutation) =>
				!!fieldId &&
				(mutation.state.variables as EditFieldVariables | undefined)?.id ===
					fieldId,
		},
		select: (mutation) => mutation.state.status,
	});

	const status = statuses.at(-1) ?? "idle";

	return {
		isPending: status === "pending",
		showSuccess: useSuccessIndicator(status === "success"),
	};
}
