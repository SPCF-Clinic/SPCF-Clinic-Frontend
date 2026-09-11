import type { PropsWithChildren } from "react";

import { FieldContext, type FieldContextValue } from "./fieldContext";

type FieldProviderProps = PropsWithChildren & FieldContextValue;

export default function FieldProvider({
	children,
	field,
	fieldType,
	isDefault,
}: FieldProviderProps) {
	return (
		<FieldContext.Provider value={{ field, fieldType, isDefault }}>
			{children}
		</FieldContext.Provider>
	);
}
