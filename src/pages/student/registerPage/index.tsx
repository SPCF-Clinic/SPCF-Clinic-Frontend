import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "@mantine/form";
import { Flex, Text, TextInput, Button } from "@mantine/core";

import Footer from "../components/Footer";
import Layout from "../components/Layout";

export default function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const form = useForm({
    initialValues: { studentNumber: "" },
    validate: {
      studentNumber: (value) =>
        value.trim() ? null : "Student number is required",
    },
  });


  useEffect(() => {
    if (location.state?.studentIdError) {
      form.setFieldError("studentNumber", location.state.studentIdError);
      
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleContinue = () => {
    const validation = form.validate();
    if (validation.hasErrors) return;

    navigate(`form/${form.values.studentNumber}`);
  };

  const isFormEmpty = form.values.studentNumber.trim() === "";

  return (
    <Layout>
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
            {...form.getInputProps("studentNumber")}
            onChange={(e) => {
              form.setFieldValue("studentNumber", e.currentTarget.value);
              form.clearFieldError("studentNumber"); // Clear error when typing
            }}
          />
        </Flex>

        <Flex direction={"column"}>
          <Button
            type="button"
            radius={40}
            variant="gradient"
            size="md"
            gradient={{ from: "#29315B", to: "#294FAF", deg: 90 }}
            opacity={isFormEmpty ? 0.7 : 1}
            disabled={isFormEmpty}
            onClick={handleContinue}
          >
            Continue
          </Button>
        </Flex>

        <Footer />
      </Flex>
    </Layout>
  );
}