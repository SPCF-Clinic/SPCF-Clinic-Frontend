import { createFormContext } from "@mantine/form";
import type { FieldData } from "@/api/fields";

export type FieldFormValues = Partial<FieldData>;

export const [
	FormEditorFormProvider,
	useFormEditorFormContext,
	useFormEditorForm,
] = createFormContext<FieldFormValues>();
