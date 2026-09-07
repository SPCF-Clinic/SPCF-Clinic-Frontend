import type { PropsWithChildren } from "react";

import type { FormField } from "@/types/student-register";
import { FieldContext } from "./fieldContext";

interface FieldProviderProps extends PropsWithChildren {
	field?: FormField;
}

export default function FieldProvider({ children, field }: FieldProviderProps) {
	return (
		<FieldContext.Provider value={field ?? null}>
			{children}
		</FieldContext.Provider>
	);
}
