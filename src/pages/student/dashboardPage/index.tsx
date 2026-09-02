import { Flex, Box, Button, Text, Title, Stack } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

import Footer from "../components/Footer";
import Layout from "../components/Layout";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { logoutMutation } = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  return (
    <Layout height="100%">
      <Flex
        direction="column"
        justify="space-between"
        style={{ minHeight: "100%" }}
      >
        <Stack gap="lg">
          {/* Header Section */}
          <Box mt="xs">
            <Text
              size="xs"
              fw={700}
              c="dimmed"
              style={{ letterSpacing: "0.5px" }}
            >
              HEALTH ASSESSMENT FORM
            </Text>
            <Title order={2} fw={800} fz={28} mt={4}>
              Edit your Information
            </Title>
            <Text size="sm" c="dimmed" mt={4}>
              Create a strong password with a mix of letters, numbers and symbols
            </Text>
          </Box>

          {/* Action Buttons */}
          <Stack gap="md">
            <Button
              size="xl"
              variant="default"
              justify="flex-start"
              fullWidth
              radius="md"
              h={56}
              styles={{
                root: {
                  backgroundColor: "#ffffff",
                  borderColor: "#e0e0e0",
                  color: "#1a1a1a",
                  fontWeight: 600,
                  fontSize: "15px",
                  paddingLeft: "20px",
                },
              }}
              onClick={() => navigate(`update-details?type=personal_info`)}
            >
              Personal Information
            </Button>

            <Button
              size="xl"
              variant="default"
              justify="flex-start"
              fullWidth
              radius="md"
              h={56}
              styles={{
                root: {
                  backgroundColor: "#ffffff",
                  borderColor: "#e0e0e0",
                  color: "#1a1a1a",
                  fontWeight: 600,
                  fontSize: "15px",
                  paddingLeft: "20px",
                },
              }}
              onClick={() => navigate(`update-details?type=medical_history`)}
            >
              Medical & Vaccination History
            </Button>
          </Stack>
        </Stack>

        {/* Footer & Logout Section */}
        <Box mt="xl">
          <Button
            onClick={handleLogout}
            size="lg"
            radius="xl"
            mb={15}
            fullWidth
            h={50}
            bg="#294FAF"
            styles={{
              root: {
                fontWeight: 600,
                fontSize: "16px",
              },
            }}
          >
            Log out
          </Button>
          <Footer />
        </Box>
      </Flex>
    </Layout>
  );
}