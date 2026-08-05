import { useState } from "react";
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

export default function LoginPage() {

  const navigate = useNavigate()

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      studentNumber: "",
      password: "",
    },
    validate: {
      studentNumber: (val) =>
        val.trim() ? null : "Student number is required",
      password: (val) => (val.trim() ? null : "Password is required"),
    },
  });

  const isFormEmpty =
    !form.getValues().studentNumber.trim() || !form.getValues().password.trim();

  const handleSubmit = (values: typeof form.values) => {
    console.log("Form Submitted Successfully:", values);
  };

  return (
    <Flex h={"91.1vh"} align={"flex-end"}>
      <Box
        component="form"
        onSubmit={form.onSubmit(handleSubmit)}
        w={"100vw"}
        bg={"#EDF0F6"}
        bdrs={"40px 40px 0px 0px"}
        p={"40px"}
      >
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
              key={form.key("studentNumber")}
              {...form.getInputProps("studentNumber")}
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
            <Button radius={40} variant="subtle" onClick={() => {navigate("register")}}>
              Register
            </Button>
          </Flex>

          <Divider />

          <Flex align={"center"} gap={10}>
            <IconLock color="#737373" size={15} />
            <Text fz={12} c={"#737373"}>
              Your information is kept confidential and used only for clinic
              records.
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
