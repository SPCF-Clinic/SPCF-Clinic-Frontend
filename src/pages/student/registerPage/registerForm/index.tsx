import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

  const [active, setActive] = useState(0);

  const { data: step1_data, isFetching: step1_isFetching } = usePersonalInfo();
  const { data: step2_data, isFetching: step2_isFetching } = useMedicalInfo();

  const form = useForm({
    initialValues: {
      student_id: studentId,
      password: "",
      confirm_password: "",
      personal_info_form_version: step1_data?.form_version,
      medical_history_form_version: step2_data?.form_version,
      personal_info: {} as Record<number, string>,
      medical_history: {} as Record<number, string>,
      full_name: "",
    },

    validate: {
      confirm_password: (value, values) =>
        value === values.password && value.trim()
          ? null
            : "Password and confirm password are invalid.",

      full_name: (value) =>
        value.trim() ? null : "Full name is required",
    },
  });


useEffect(() => {
  if (step1_data?.form_version) {
    form.setFieldValue('personal_info_form_version', step1_data.form_version);
  }
  if (step2_data?.form_version) {
    form.setFieldValue('medical_history_form_version', step2_data.form_version);
  }
}, [step1_data, step2_data]); 


  const handleNext = () => {
    if (active === 3) {
      const result = form.validateField("confirm_password");

      if (result.hasError) {
        return;
      }
    } else if (active === 5) {
      const result = form.validateField("full_name");
      if (result.hasError) {
        return;
      }
    }
    setActive((current) => (current < 6 ? current + 1 : current));
  };

  const createRegisterPayload = (values: typeof form.values) => {
  return {
    student_id: values.student_id,
    password: values.password,
    personal_info_form_version: values.personal_info_form_version,
    medical_history_form_version: values.medical_history_form_version,

    ...Object.fromEntries(
      Object.entries(values.personal_info).map(([id, value]) => [
        `personal_info[${id}]`,
        value,
      ])
    ),

    ...Object.fromEntries(
      Object.entries(values.medical_history).map(([id, value]) => [
        `medical_history[${id}]`,
        value,
      ])
    ),
  };
};

  const handleSubmit = () => {
const payload = createRegisterPayload(form.values)
console.log(payload)
  }

  const underStepper = () => {
    return (
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
  };

  console.log(form.values.student_id);
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
            {underStepper()}
            {step2_isFetching ? (
              <SectionSkeleton />
            ) : (
              <Step_2 data={step2_data?.data} form={form} />
            )}
          </Stepper.Step>

          <Stepper.Step>
            {underStepper()}
            <Step_3 form={form} />
          </Stepper.Step>

          <Stepper.Step>
            {underStepper()}
            <Step_4
              step1_data={step1_data}
              step2_data={step2_data}
              personal_info={form.values.personal_info}
              medical_history={form.values.medical_history}
            />
          </Stepper.Step>
          <Stepper.Step>
            {underStepper()}
            <Step_5 form={form} />
          </Stepper.Step>
        </Stepper>
        {active !== 0 && (
          <Button onClick={active >= 5 ? handleSubmit:handleNext} bdrs={20} mb={10}>
            {active >= 5 ? "Submit" : "Continue"}
          </Button>
        )}
      </Stack>
      <Footer />
    </Layout>
  );
}
