import { createContext } from "react";

import type { FieldType } from "@/api/fields";
import type { FormField } from "@/types/student-register";

export interface FieldContextValue {
	field: FormField;
	fieldType: FieldType;
}

export const FieldContext = createContext<FieldContextValue | null>(null);
