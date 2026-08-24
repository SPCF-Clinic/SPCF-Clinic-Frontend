import { useState } from "react";
import { useParams } from "react-router-dom";
import {useForm} from "@mantine/form"
import { Stepper, Button, Group, Stack, Paper, Text } from "@mantine/core";

import {
  usePersonalInfo,
  useMedicalInfo,
  useRegisterUser
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
    personal_info_form_version: step1_data?.data.form_version,
    medical_history_form_version: step2_data?.data.form_version,
    personal_info: {} as Record<number, string>,
  },
});
console.log(form.values.student_id)
  return (
    <Layout>
      <Stack>
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
            {step2_isFetching ? (
              <SectionSkeleton />
            ) : (
              <Step_2 data={step2_data?.data} />
            )}
          </Stepper.Step>

          <Stepper.Step>
            <Step_3 />
          </Stepper.Step>

          <Stepper.Step>
            <Step_4 />
          </Stepper.Step>
          <Stepper.Step>
            <Step_5 />
          </Stepper.Step>

          <Stepper.Completed>
            <Text>All steps completed!</Text>
          </Stepper.Completed>
        </Stepper>
        {active !== 0 && (
          <Group justify="space-between" my="md">
            <Button
              variant="default"
              disabled={active === 0}
              onClick={() => setActive((current) => current - 1)}
            >
              Previous
            </Button>
            <Button
              onClick={() =>
                setActive((current) => (current < 5 ? current + 1 : current))
              }
            >
              {active === 4 ? "Finish" : "Next"}
            </Button>
          </Group>
        )}
      </Stack>
      <Footer />
    </Layout>
  );
}
