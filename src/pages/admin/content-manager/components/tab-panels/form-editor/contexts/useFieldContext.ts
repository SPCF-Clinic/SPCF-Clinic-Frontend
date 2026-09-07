import { use } from "react";

import { FieldContext } from "./fieldContext";

export function useFieldContext() {
	const context = use(FieldContext);

	if (!context) {
		throw new Error(
			"useFieldContext must be used within a FieldContext.Provider",
		);
	}

	return context;
}
