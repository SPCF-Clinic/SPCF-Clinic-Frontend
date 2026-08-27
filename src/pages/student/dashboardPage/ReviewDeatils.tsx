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
import { useParams, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { IconLock } from "@tabler/icons-react";

import {
  useUpdateMedicalHistory,
  useUpdatePersonalInfo,
} from "@/query/student-dashboard";

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

  const handleConfirmUpdate = () => {
    if (!formData) return;

    const mutation = isPersonal ? updatePersonalInfo : updateMedicalHistory;

    mutation.mutate(
      { student_number: Number(student_number), ...formData },
      {
        onSuccess: () => {
          navigate(`/student-dashboard/${student_number}`);
        },
      }
    );
  };

  const isPending = updatePersonalInfo.isPending || updateMedicalHistory.isPending;

  // Fallback if user navigates directly without state data
  const dataEntries = formData 
    ? Object.entries(isPersonal ? formData.personal_info : formData.medical_history) 
    : [];

  return (
    <Layout height="100%">
      <Box>
        {/* Breadcrumb Navigation Header */}
        <Breadcrumbs separator=">" mb="xs">
          <Anchor onClick={() => navigate(-1)} size="xs" c="dimmed">
            Home
          </Anchor>
          <Anchor onClick={() => navigate(-1)} size="xs" c="dimmed">
            {isPersonal ? "Personal Information" : "Medical & Vaccination History"}
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
            {isPersonal ? "Personal Information" : "Medical & Vaccination History"}
          </Text>
          <Divider flex={1} />
        </Group>

        {/* Dynamic Summary List */}
        <Stack gap="sm" mb={30}>
          {dataEntries.map(([key, value]) => (
            <Group key={key} justify="space-between" align="flex-start">
              <Text size="sm" c="dimmed" w="40%">
                Field #{key}
              </Text>
              <Text size="sm" fw={500} w="58%" ta="right">
                {Array.isArray(value) ? value.join(", ") : String(value || "—")}
              </Text>
            </Group>
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

          {/* Confidentiality Notice */}
          <Group justify="center" gap={8} mt="md">
            <IconLock size={14} color="gray" />
            <Text size="xs" c="dimmed" ta="center">
              Your information is kept confidential and used only for clinic records.
            </Text>
          </Group>

          <Box mt="md">
            <Footer />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}