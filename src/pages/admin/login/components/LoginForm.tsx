import { Button, Stack, Text, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";

import { useAuth } from "@/hooks/useAuth";

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

	const handleAdminLogin = () =>
		loginMutation.mutate({ username: "admin1", password: "admin" });

	const handleSuperAdminLogin = () =>
		loginMutation.mutate({ username: "superadmin", password: "superadmin" });

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
				<TextInput
					withAsterisk={false}
					label="Password"
					required
					radius="xl"
					size="md"
					styles={{ label: { marginBottom: "0.5rem" } }}
					key={form.key("password")}
					{...form.getInputProps("password")}
				/>
				<Button
					type="submit"
					radius="xl"
					size="md"
					loading={loginMutation.isPending}
				>
					Submit
				</Button>

				<Button onClick={handleAdminLogin}>Admin Login</Button>
				<Button onClick={handleSuperAdminLogin}>Super Admin Login</Button>
			</Stack>
		</form>
	);
}
