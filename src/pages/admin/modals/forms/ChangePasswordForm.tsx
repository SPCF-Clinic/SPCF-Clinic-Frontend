import { PasswordInput, Button, Stack } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useForm } from "@mantine/form";

import { toast } from "@/components/toast";
import { useUpdatePasswordMutation } from "@/hooks/users/useUpdatePasswordMutation";
import { showToastError } from "@/utils/toastError";

interface ChangePasswordFormProps {
  userId: number;
}

export default function ChangePasswordForm({
  userId,
}: ChangePasswordFormProps) {
  const { mutate: updatePassword, isPending } =
    useUpdatePasswordMutation(userId);

  const form = useForm({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validate: {
      password: (value) =>
        value.length < 8 ? "Password must be at least 8 characters" : null,
      confirm_password: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    updatePassword(values.password, {
      onSuccess: () => {
        modals.closeAll();
        toast.success({ message: "Password updated" });
      },
      onError: (error) => {
        showToastError(error, "Failed to update password");
      },
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <PasswordInput
          label="Password"
          placeholder="password123"
          required
          radius="md"
          {...form.getInputProps("password")}
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="password123"
          required
          radius="md"
          {...form.getInputProps("confirm_password")}
        />

        <Button
          type="submit"
          fullWidth
          radius="xl"
          size="md"
          mt="xs"
          loading={isPending}
          styles={{
            root: {
              backgroundColor: "#2F4899",
              "&:hover": {
                backgroundColor: "#223675",
              },
            },
          }}
        >
          Confirm
        </Button>
      </Stack>
    </form>
  );
}
