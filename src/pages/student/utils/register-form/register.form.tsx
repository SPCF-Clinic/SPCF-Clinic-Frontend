import type { UseFormReturnType } from "@mantine/form";

export interface DynamicFormField {
  id: number;
  name: string;
  is_required: boolean;
  type?: {
    name: string;
  };
}

export interface FormValues {
  student_id?: string;
  password: string;
  confirm_password: string;
  personal_info_form_version?: string;
  medical_history_form_version?: string;
  personal_info: Record<number, string>;
  medical_history: Record<number, string>;
  full_name: string;
}

export const isStepDisabled = (
  active: number,
  formValues: FormValues,
  step1Data?: { data: DynamicFormField[] },
  step2Data?: { data: DynamicFormField[] },
): boolean => {
  if (active === 1) {
    if (!step1Data?.data) return true;
    return step1Data.data.some((field) => {
      if (field.is_required && field.type?.name !== "Divider") {
        const val = formValues.personal_info[field.id];
        return !val || !val.toString().trim();
      }
      return false;
    });
  }

  if (active === 2) {
    if (!step2Data?.data) return true;
    return step2Data.data.some((field) => {
      if (field.is_required && field.type?.name !== "Divider") {
        const val = formValues.medical_history[field.id];
        return !val || !val.toString().trim();
      }
      return false;
    });
  }

  if (active === 5) {
    return !formValues.full_name.trim();
  }

  return false;
};


export const createStudentFormPayload = (values: any, type: string) => {
  if (type === "register") {
    return {
      student_id: values.student_id,
      password: values.password,
      personal_info_form_version: values.personal_info_form_version,
      medical_history_form_version: values.medical_history_form_version,

      ...Object.fromEntries(
        Object.entries(values.personal_info).map(([id, value]) => [
          `personal_info[${id}]`,
          value,
        ]),
      ),

      ...Object.fromEntries(
        Object.entries(values.medical_history).map(([id, value]) => [
          `medical_history[${id}]`,
          value,
        ]),
      ),
    };
  } else if (type === "personal") {
    return {
      form_version: values.form_version ?? values.personal_info_form_version,

      ...Object.fromEntries(
        Object.entries(values.formData ?? {}).map(([id, value]) => [
          `personal_info[${id}]`,
          value,
        ]),
      ),
    };
  } else if (type === "medical") {
    return {
      form_version: values.form_version ?? values.medical_history_form_version,

      ...Object.fromEntries(
        Object.entries(values.formData ?? {}).map(([id, value]) => [
          `medical_history[${id}]`,
          value,
        ]),
      ),
    };
  }
};


export const handleStepNext = (
  active: number,
  form: UseFormReturnType<FormValues>,
  setActive: React.Dispatch<React.SetStateAction<number>>,
) => {
  if (active === 1) {
    const result = form.validateField("personal_info");
    if (result.hasError) return;
  } else if (active === 2) {
    const result = form.validateField("medical_history");
    if (result.hasError) return;
  } else if (active === 3) {
    const passResult = form.validateField("password");
    const confirmResult = form.validateField("confirm_password");
    if (passResult.hasError || confirmResult.hasError) return;
  } else if (active === 5) {
    const result = form.validateField("full_name");
    if (result.hasError) return;
  }

  setActive((current) => (current < 5 ? current + 1 : current));
};


export const extractApiErrorMessage = (error: any): string => {
  return (
    error?.response?.data?.errors?.student_id?.[0] ||
    error?.response?.data?.message ||
    "Registration failed. Please try again."
  );
};
export const data_type = (type_name: string) => {
  if (type_name === "Short Text" || type_name === "Long Text") {
    return "Text";
  }

  if (type_name === "Date") {
    return "Date";
  }

  if (type_name === "Radio") {
    return "Radio";
  }

  if (type_name === "Divider") {
    return "Divider";
  }

  if (type_name === "Dropdown") {
    return "Dropdown";
  }

  if (type_name === "Checkbox") {
    return "Checkbox";
  }
};
