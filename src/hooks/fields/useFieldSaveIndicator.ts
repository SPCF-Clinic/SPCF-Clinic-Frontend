import { useMutationState } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import type { EditFieldVariables } from "@/api/fields";
import { EDIT_FIELD_MUTATION_KEY } from "./useEditFieldMutation";

const SUCCESS_INDICATOR_DURATION_MS = 2000;

function useSuccessIndicator(status: "idle" | "pending" | "success" | "error") {
	const [visible, setVisible] = useState(false);
	const prevStatusRef = useRef(status);

	useEffect(() => {
		const prev = prevStatusRef.current;
		prevStatusRef.current = status;

		// Only flash when we actually transition pending -> success.
		if (prev === "pending" && status === "success") {
			setVisible(true);
		}
	}, [status]);

	useEffect(() => {
		if (!visible) return;
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

	const status = (statuses.at(-1) ?? "idle") as
		| "idle"
		| "pending"
		| "success"
		| "error";

	return {
		isPending: status === "pending",
		showSuccess: useSuccessIndicator(status),
	};
}
