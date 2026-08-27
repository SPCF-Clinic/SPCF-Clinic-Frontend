import { Text } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";

import TextInput1 from "../components/TextInput";

interface RegisterFormValues {
  student_id: string;
  password: string;
  confirm_password: string;

  personal_info_form_version?: string;
  medical_history_form_version?: string;

  personal_info: Record<number, string>;
  medical_history: Record<number, string>;
}

interface Step_3Props {
  form: UseFormReturnType<RegisterFormValues>;
}

export default function Step_3({ form }: Step_3Props) {
  return (
    <>
      <Text fz={32} fw={700}>
        Secure your account
      </Text>

      <Text mb={5}>
        Create a strong password with a mix of letters, numbers and symbols.
      </Text>

      <TextInput1
        label="Password"
        value={form.values.password}
        onChange={(value) =>
          form.setFieldValue("password", value)
        }
        error={form.errors.password}
      />

      <TextInput1
        label="Confirm password"
        value={form.values.confirm_password}
        onChange={(value) =>
          form.setFieldValue("confirm_password", value)
        }
        error={form.errors.confirm_password}
      />
    </>
  );
}