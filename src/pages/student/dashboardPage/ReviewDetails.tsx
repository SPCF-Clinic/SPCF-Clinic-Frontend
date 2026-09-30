import {
  Box,
  Button,
  Text,
  Anchor,
  Breadcrumbs,
  Stack,
  Title,
  Group,
  Divider,
} from "@mantine/core";
import {
  useParams,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { createStudentFormPayload } from "../utils/register-form/register.form";
import {
  useUpdateMedicalHistory,
  useUpdatePersonalInfo,
} from "@/query/student-dashboard";
import { useSpecificStudent } from "@/query/student-dashboard";
import type {
  MedicalHistoryQueryParams,
  PersonalInfoQueryParams,
} from "@/types/student-dashboard";

import Layout from "../components/Layout";
import Footer from "../components/Footer";

export default function ReviewDetails() {
  const { student_number } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const type = searchParams.get("type");
  const isPersonal = type === "personal_info";
  const formData = location.state?.formData;

  const updatePersonalInfo = useUpdatePersonalInfo();
  const updateMedicalHistory = useUpdateMedicalHistory();

  const isPending =
    updatePersonalInfo.isPending || updateMedicalHistory.isPending;

  const { data: studentData } = useSpecificStudent(Number(student_number));
  console.log(studentData);

  const fields = isPersonal
    ? (studentData?.data?.personal_info ?? [])
    : (studentData?.data?.medical_history ?? []);

  const values = isPersonal
    ? (formData?.personal_info ?? {})
    : (formData?.medical_history ?? []);

  const reviewData = fields
    .filter((field) => values[field.id] !== undefined)
    .sort((a, b) => a.form_order - b.form_order)
    .map((field) => ({
      id: field.id,
      name: field.name,
      form_order: field.form_order,
      value: values[field.id],
    }));

  const handleConfirmUpdate = () => {
    if (!formData) return;
    console.log(formData);

    const data = {
      form_version: isPersonal
        ? studentData?.data.personal_info_form_version
        : studentData?.data.medical_history_form_version,
      formData: isPersonal ? formData.personal_info : formData.medical_history,
    };

    console.log("data", data);

    if (isPersonal) {
      const payload = createStudentFormPayload(
        data,
        "personal",
      ) as PersonalInfoQueryParams | undefined;

      if (!payload) return;

      updatePersonalInfo.mutate(
        { student_number: Number(student_number), request: payload },
        {
          onSuccess: () => {
            navigate(`/student-dashboard/${student_number}`);
          },
        },
      );
      return;
    }

    const payload = createStudentFormPayload(
      data,
      "medical",
    ) as MedicalHistoryQueryParams | undefined;

    if (!payload) return;

    updateMedicalHistory.mutate(
      { student_number: Number(student_number), request: payload },
      {
        onSuccess: () => {
          navigate(`/student-dashboard/${student_number}`);
        },
      },
    );
  };

  return (
    <Layout height="100%">
      <Box>
        {/* Breadcrumb Navigation Header */}
        <Breadcrumbs separator=">" mb="xs">
          <Anchor onClick={() => navigate(-1)} size="xs" c="dimmed">
            Home
          </Anchor>
          <Anchor onClick={() => navigate(-1)} size="xs" c="dimmed">
            {isPersonal
              ? "Personal Information"
              : "Medical & Vaccination History"}
          </Anchor>
          <Text size="xs" c="dimmed" fw={500}>
            Review
          </Text>
        </Breadcrumbs>

        {/* Page Title & Subtitle */}
        <Box mb="lg">
          <Title order={2} fw={800} fz={28}>
            Review your Information
          </Title>
          <Text size="sm" c="dimmed" mt={4}>
            Check everything below before submitting
          </Text>
        </Box>

        {/* Section Divider Header */}
        <Group align="center" mb="md">
          <Divider flex={1} />
          <Text size="xs" fw={700} c="dimmed" tt="uppercase" lts={1}>
            {isPersonal
              ? "Personal Information"
              : "Medical & Vaccination History"}
          </Text>
          <Divider flex={1} />
        </Group>

        {/* Dynamic Summary List */}
        <Stack gap="sm" mb={30}>
          {reviewData.map((item) => (
            <Box key={item.id}>
              <Text fw={600}>{item.name}</Text>
              <Text ta={"right"}>
                {Array.isArray(item.value) ? item.value.join(", ") : item.value}
              </Text>
            </Box>
          ))}
        </Stack>

        {/* Action Button */}
        <Box mt={30}>
          <Button
            onClick={handleConfirmUpdate}
            size="lg"
            radius="xl"
            fullWidth
            h={50}
            bg="#294FAF"
            loading={isPending}
            styles={{
              root: {
                fontWeight: 600,
                fontSize: "16px",
              },
            }}
          >
            Update
          </Button>

          <Box mt="md">
            <Footer />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
