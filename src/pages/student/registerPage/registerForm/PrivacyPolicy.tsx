
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Title,
  Text,
  ScrollArea,
  Checkbox,
  Button,
  Stack,
} from "@mantine/core";

interface PrivacyPolicyProps {
  setActive: () => void
}

export default function PrivacyPolicyPage({setActive}: PrivacyPolicyProps) {
  const [agreed, setAgreed] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (agreed) {
      setActive();
    }
  };
  return (
    <>
      {" "}
      <Text fz={11} fw={600} lts={0.8} c="#7d828a" tt="uppercase">
        Health Assessment Form
      </Text>
      <Title order={1} fz={28} fw={800} c="#111111" lts={-0.5}>
        Privacy Policy
      </Title>
      <Text size="sm" c="#555555" mb="sm">
        Please read the following before completing the health assessment form.
      </Text>
      <Paper
        shadow="none"
        bg="#e9ecef"
        bd="1px solid #dcdfe4"
        radius="md"
        p={5}
        h={400}
      >
        <ScrollArea h={390} scrollbars="y" type="always" offsetScrollbars>
          <Stack gap="md" pr={8}>
            <Text size="xs" lh={1.45} c="#333333">
              This Patient Privacy Policy sets forth the standards of the SPCF
              Medical and Dental Services governing the privacy and security of
              our patients’ personal information, particularly health
              information, as well as the controlled release and disclosure of
              such information, consistent with the Data Privacy Act of 2012 and
              other applicable laws.
            </Text>

            <Text size="xs" lh={1.45} c="#333333">
              We understand that information about you and your child’s health
              is personal. We are committed to protecting the health information
              you provide on behalf of your child. This information is
              confidential in nature and will be recorded in a medical record.
              We will use and share this record to provide you with quality care
              and to comply with certain legal requirements. This record will be
              available to all health care and allied health professionals who
              need access only in relation to your child’s health.
            </Text>

            <Text size="xs" lh={1.45} c="#333333">
              While we may need your personal information for other purposes, we
              will not use or disclose your information without your permission.
            </Text>

            <Text size="xs" lh={1.45} c="#333333">
              Your continued completion of the following questionnaire will be
              deemed your acceptance of this policy.
            </Text>
          </Stack>
        </ScrollArea>
      </Paper>
      <Checkbox
        my="sm"
        radius="xl"
        color="#5271ff"
        checked={agreed}
        onChange={(event) => setAgreed(event.currentTarget.checked)}
        size="xs"
        label="I confirm that I have read, consent, and agree to SPCF's Patient Privacy Policy. I understand my child's health information will be kept confidential and used only for clinic care."
      />
      <Button
        fullWidth
        onClick={handleSubmit}
        disabled={!agreed}
        bg="#5371c6"
        my={10}
        radius={40}
      >
        Continue
      </Button>
    </>
  );
}