import { useEffect } from "react";
import { Flex, Box, Button } from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";

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
        <Flex direction="column" justify="space-between" gap={10}>
          <Button
            size="lg"
            variant="outline"
            justify="flex-start"
            fullWidth
            bg={"white"}
            onClick={() => navigate(`update-details?type=personal_info`)}
          >
            Personal Information
          </Button>
          <Button
            size="lg"
            variant="outline"
            justify="flex-start"
            fullWidth
            bg={"white"}
             onClick={() => navigate(`update-details?type=medical_history`)}
          >
            Medical & Vaccination History
          </Button>
        </Flex>

        <Box>
          <Button
            onClick={handleLogout}
            size="lg"
            variant="gradient"
            mb={10}
            bdrs={20}
            fullWidth
            gradient={{ from: "#29315B", to: "#294FAF", deg: 90 }}
          >
            Log out
          </Button>
          <Footer />
        </Box>
      </Flex>
    </Layout>
  );
}
