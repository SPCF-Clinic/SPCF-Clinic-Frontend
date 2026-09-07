import { createContext } from "react";
import type { FormField } from "@/types/student-register";

export const FieldContext = createContext<FormField | null>(null);
