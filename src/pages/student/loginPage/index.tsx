import { useNavigate } from "react-router-dom";

import { useForm } from "@mantine/form";
import { IconLock } from "@tabler/icons-react";
import {
  Box,
  Flex,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Divider,
} from "@mantine/core";

import useAuthStore from "../../../stores/auth";
import { useLogin } from "../../../query/auth";

import Footer from "../components/Footer";
import Layout from "../components/Layout";

export default function LoginPage() {
  const navigate = useNavigate();

  const { login } = useAuthStore();

  const loginMutation = useLogin();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (val: string) =>
        val.trim() ? null : "Student number is required",
      password: (val: string) => (val.trim() ? null : "Password is required"),
    },
  });

  const isFormEmpty =
    !form.getValues().username.trim() || !form.getValues().password.trim();

  const handleSubmit = () => {
    loginMutation.mutate(form.values, {
      onSuccess: (data) => {
        login(data.user.role);
        navigate(`student-dashboard`)
      },
    });
  };

  return (
    <Layout onSubmit={form.onSubmit(handleSubmit)}>
      <Flex direction={"column"} gap={20}>
        <div>
          <Text fz={29} fw={700}>
            Health Assessment Form
          </Text>
          <Text fz={14} fw={400}>
            Log in to edit your clinic profile.
          </Text>
        </div>

        <Flex direction={"column"} gap={5}>
          <TextInput
            size="md"
            radius={40}
            placeholder="Enter your student number"
            key={form.key("username")}
            {...form.getInputProps("username")}
          />
          <PasswordInput
            size="md"
            radius={40}
            placeholder="Enter your password"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
        </Flex>

        <Flex direction={"column"}>
          <Button
            type="submit"
            radius={40}
            variant="gradient"
            size="md"
            gradient={{ from: "#29315B", to: "#294FAF", deg: 90 }}
            opacity={isFormEmpty ? 0.7 : 1}
          >
            Continue
          </Button>
          <Button
            radius={40}
            variant="subtle"
            onClick={() => {
              navigate("register");
            }}
          >
            Register
          </Button>
        </Flex>

        <Footer />
      </Flex>
    </Layout>
  );
}
