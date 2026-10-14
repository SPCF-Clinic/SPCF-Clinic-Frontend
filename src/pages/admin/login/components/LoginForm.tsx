import { Button, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";

import { useAuth } from "@/hooks/useAuth";
import { isApiError } from "@/utils/api";

export default function LoginForm() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: isNotEmpty("Username is required"),
      password: isNotEmpty("Password is required"),
    },
  });

  const { loginMutation } = useAuth();

  return (
    <form onSubmit={form.onSubmit((values) => loginMutation.mutate(values))}>
      <Stack p={{ base: "md", md: "xl" }} gap="xl">
        <Stack align="center" gap={2}>
          <Text component="h1" size="xl" fz="h2" fw="bold">
            Welcome back
          </Text>
          <Text>Login to your account</Text>
        </Stack>
        <TextInput
          withAsterisk={false}
          label="Username"
          required
          radius="xl"
          size="md"
          styles={{ label: { marginBottom: "0.5rem" } }}
          key={form.key("username")}
          {...form.getInputProps("username")}
        />
        <PasswordInput
          withAsterisk={false}
          label="Password"
          required
          radius="xl"
          size="md"
          styles={{ label: { marginBottom: "0.5rem" } }}
          key={form.key("password")}
          {...form.getInputProps("password")}
        />

        {loginMutation.isError && (
          <Text c="red" size="sm" role="alert">
            {isApiError(loginMutation.error)
              ? loginMutation.error.response?.data?.message
              : "Login failed. Please try again."}
          </Text>
        )}

        <Button
          type="submit"
          radius="xl"
          size="md"
          loading={loginMutation.isPending}
        >
          Submit
        </Button>
      </Stack>
    </form>
  );
}
