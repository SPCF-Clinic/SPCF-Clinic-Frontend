import { createFormContext } from "@mantine/form";
import type { FieldFormValues } from "@/api/fields";

export type { FieldFormValues } from "@/api/fields";

export const [
  FormEditorFormProvider,
  useFormEditorFormContext,
  useFormEditorForm,
] = createFormContext<FieldFormValues>();
