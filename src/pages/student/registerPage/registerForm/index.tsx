import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import {
  Stepper,
  Button,
  Group,
  Stack,
  UnstyledButton,
  Text,
} from "@mantine/core";

import {
  usePersonalInfo,
  useMedicalInfo,
  useRegisterUser,
} from "../../../../query/register.form.field";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  isStepDisabled,
  createRegisterPayload,
  handleStepNext,
  extractApiErrorMessage,
} from "../../utils/register.form";
import type { FormValues } from "../../utils/register.form";

import Footer from "../../components/Footer";
import Layout from "../../components/Layout";
import SectionSkeleton from "../components/Skeleton";

import PrivacyPolicyPage from "../registerForm/PrivacyPolicy";
import Step_1 from "./Step_1";
import Step_2 from "./Step_2";
import Step_3 from "./Step_3";
import Step_4 from "./Step_4";
import Step_5 from "./Step_5";

export default function Form() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  const { data: step1_data, isFetching: step1_isFetching } = usePersonalInfo();
  const { data: step2_data, isFetching: step2_isFetching } = useMedicalInfo();
  const { mutate: registerUser, isPending: isSubmitting } = useRegisterUser();

  const form = useForm<FormValues>({
    initialValues: {
      student_id: studentId,
      password: "",
      confirm_password: "",
      personal_info_form_version: step1_data?.form_version,
      medical_history_form_version: step2_data?.form_version,
      personal_info: {},
      medical_history: {},
      full_name: "",
    },

    validate: {
      personal_info: (value) => {
        if (!step1_data?.data) return null;
        const errors: Record<number, string> = {};

        step1_data.data.forEach((field) => {
          if (field.is_required && field.type?.name !== "Divider") {
            const val = value[field.id];
            if (!val || !val.toString().trim()) {
              errors[field.id] = `${field.name} is required`;
            }
          }
        });

        return Object.keys(errors).length > 0 ? errors : null;
      },

      medical_history: (value) => {
        if (!step2_data?.data) return null;
        const errors: Record<number, string> = {};

        step2_data.data.forEach((field) => {
          if (field.is_required && field.type?.name !== "Divider") {
            const val = value[field.id];
            if (!val || !val.toString().trim()) {
              errors[field.id] = `${field.name} is required`;
            }
          }
        });

        return Object.keys(errors).length > 0 ? errors : null;
      },

      password: (value) => {
        if (!value || !value.trim()) return "Password is required";
        if (value.trim().length < 8)
          return "Password must be at least 8 characters long";
        return null;
      },

      confirm_password: (value, values) => {
        if (!value || !value.trim()) return "Please confirm your password";
        if (value !== values.password) return "Passwords do not match";
        return null;
      },

      full_name: (value) => (value.trim() ? null : "Full name is required"),
    },
  });

  useEffect(() => {
    if (step1_data?.form_version) {
      form.setFieldValue("personal_info_form_version", step1_data.form_version);
    }
    if (step2_data?.form_version) {
      form.setFieldValue(
        "medical_history_form_version",
        step2_data.form_version,
      );
    }
  }, [step1_data, step2_data]);

  const handleSubmit = () => {
    const payload = createRegisterPayload(form.values);

    registerUser(payload, {
      onSuccess: (data) => {
        navigate(`/`);
      },
      onError: (error: any) => {
        const studentIdError = extractApiErrorMessage(error);
        navigate("/register", { state: { studentIdError } });
      },
    });
  };

  const renderUnderStepper = () => (
    <Group justify="space-between" align="center" mt={2} mb="xs">
      <Text fz={12} fs="italic" c="dimmed">
        Step {active} of 5
      </Text>
      <UnstyledButton
        onClick={() => setActive((current) => current - 1)}
        style={{
          fontSize: 12,
          fontStyle: "italic",
          color: "#2B4C7E",
          fontWeight: 500,
        }}
      >
        &larr; Back
      </UnstyledButton>
    </Group>
  );

  return (
    <Layout>
      <Stack>
        <Text mx={4} fz={10} fw={400}>
          HEALTH ASSESSMENT FORM
        </Text>
        <Stepper
          active={active}
          onStepClick={setActive}
          icon={<></>}
          completedIcon={<></>}
          progressIcon={<></>}
          styles={{
            stepIcon: { display: "none" },
            stepBody: { display: "none" },
            steps: {
              display: active === 0 ? "none" : "flex",
            },
            separator: {
              marginLeft: 4,
              marginRight: 4,
              height: 4,
              borderRadius: 9999,
              flex: 1,
            },
          }}
        >
          <Stepper.Step>
            <PrivacyPolicyPage
              setActive={() =>
                setActive((current) => (current < 5 ? current + 1 : current))
              }
            />
          </Stepper.Step>

          <Stepper.Step>
            {step1_isFetching ? (
              <SectionSkeleton />
            ) : (
              <Step_1 data={step1_data?.data} form={form} />
            )}
          </Stepper.Step>

          <Stepper.Step>
            {renderUnderStepper()}
            {step2_isFetching ? (
              <SectionSkeleton />
            ) : (
              <Step_2 data={step2_data?.data} form={form} />
            )}
          </Stepper.Step>

          <Stepper.Step>
            {renderUnderStepper()}
            <Step_3 form={form} />
          </Stepper.Step>

          <Stepper.Step>
            {renderUnderStepper()}
            <Step_4
              step1_data={step1_data}
              step2_data={step2_data}
              personal_info={form.values.personal_info}
              medical_history={form.values.medical_history}
            />
          </Stepper.Step>

          <Stepper.Step>
            {renderUnderStepper()}
            <Step_5 form={form} />
          </Stepper.Step>
        </Stepper>

        {active !== 0 && (
          <Button
            onClick={
              active >= 5
                ? handleSubmit
                : () => handleStepNext(active, form, setActive)
            }
            bdrs={20}
            mb={10}
            loading={isSubmitting}
            disabled={isStepDisabled(
              active,
              form.values,
              step1_data,
              step2_data,
            )}
          >
            {active >= 5 ? "Submit" : "Continue"}
          </Button>
        )}
      </Stack>
      <Footer />
    </Layout>
  );
}
