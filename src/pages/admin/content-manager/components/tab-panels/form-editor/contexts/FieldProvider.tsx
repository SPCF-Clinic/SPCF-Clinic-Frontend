import type { PropsWithChildren } from "react";

import { FieldContext, type FieldContextValue } from "./fieldContext";

type FieldProviderProps = PropsWithChildren & FieldContextValue;

export default function FieldProvider({
	children,
	field,
	fieldType,
}: FieldProviderProps) {
	return (
		<FieldContext.Provider value={{ field, fieldType }}>
			{children}
		</FieldContext.Provider>
	);
}
