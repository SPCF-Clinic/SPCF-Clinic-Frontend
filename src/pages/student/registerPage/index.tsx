import {useNavigate} from "react-router-dom"

import { useForm } from "@mantine/form";
import { Box, Flex, Text, TextInput, Button, } from "@mantine/core";

import Footer from "../components/Footer";
import Layout from "../components/Layout"

export default function RegisterPage() {

    const navigate = useNavigate()

  const form = useForm({
    initialValues: { studentNumber: "" },
  });

 const isFormEmpty = form.getValues().studentNumber.trim() === ""
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
                key={form.key("studentNumber")}
                {...form.getInputProps("studentNumber")}
            />
          </Flex>

          <Flex direction={"column"}>
            <Button
              type="submit"
              radius={40}
              variant="gradient"
              size="md"
              gradient={{ from: "#29315B", to: "#294FAF", deg: 90 }}
                opacity={isFormEmpty ? 0.7: 1}
                onClick={() => {navigate("form")}}
            >
              Continue
            </Button>
          </Flex>

         <Footer/>
        </Flex>
      </Layout>
  );
}
