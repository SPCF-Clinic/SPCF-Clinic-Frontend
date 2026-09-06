import { createFormContext } from "@mantine/form";
import type { FieldData } from "@/api/fields";

export const [
	FormEditorFormProvider,
	useFormEditorFormContext,
	useFormEditorForm,
] = createFormContext<Partial<FieldData>>();
