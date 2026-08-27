import type { UseFormReturnType } from "@mantine/form";
import { Title, Text, Checkbox, TextInput, Stack, Box } from '@mantine/core';

import TextInput1 from "../../components/TextInput"

interface RegisterFormValues {
  full_name: string;
}
interface Step_1Props {
  form: UseFormReturnType<RegisterFormValues>;
}

export default function Step_5({form}:Step_1Props) {
  return (
    
      <Stack >
        {/* Main Title */}
        <Title order={2} size="h2" fw={800} c="dark">
          Consent & Authorization
        </Title>

        {/* Subtitle / Note 1 */}
        <Text fs="italic" c="dimmed" size="sm" >
          If minor, form is to be filled up by parents with minor students
        </Text>

        {/* Section Lead */}
        <Text size="sm" fw={500} c="dark">
          I give my consent to receive from the school clinic the following services:
        </Text>

        {/* Checkbox Options */}
        <Stack mt="xs">
          <Checkbox
            label="Yes, Minor First Aid"
            size="xs"
            styles={{ label: { fontSize: '13px', color: '#2C2E33' } }}
          />

          <Checkbox
            label="Yes, Oral, Non-Prescription Medication"
            size="xs"
            styles={{ label: { fontSize: '13px', color: '#2C2E33' } }}
          />

          <Checkbox
            label="Yes, I give my consent for emergency measures to be initiated in case of accident or sudden illnesses, with the understanding that I will be notified as soon as possible."
            size="xs"
            styles={{ label: { fontSize: '13px', color: '#2C2E33', lineHeight: 1.3 } }}
          />

          <Checkbox
            label="Yes, I hereby authorize the School Dentist to give dental consultation and treatment to my child as the need wishes."
            size="xs"
            styles={{ label: { fontSize: '13px', color: '#2C2E33', lineHeight: 1.3 } }}
          />
        </Stack>

        {/* Note 2 */}
        <Text fs="italic" c="dimmed" size="xs">
          If "No", please provide the School Clinic with an alternative emergency care instruction
        </Text>

        {/* Responsibility Statement */}
        <Text size="sm" fw={500} c="dark">
          I acknowledge that it is my responsibility to inform Systems Plus College Foundation clinic or class advisers of ANY changes in my child’s health.
        </Text>

        {/* Input Helper Text */}
        <Text fs="italic" c="dimmed" size="xs">
          Type your full name to serve as your digital signature.
        </Text>

        {/* Signature Input */}
        <TextInput1
          placeholder="e.g. Juan Tamad Dela Cruz"
          value={form.values.full_name ?? ""}
              onChange={(value) => {
                form.setFieldValue("full_name", value);
              }}

               error={form.errors.full_name}
        />

        {/* Certification Text */}
        <Text size="sm" fw={600} c="dark" mt="xs">
          hereby certify that all the information in the health assessment form is true and correct.
        </Text>

        {/* Footer Note */}
        <Text fs="italic" c="dimmed" size="xs" mt={2}>
          By clicking Submit, you confirm that the information provided in this form is true and accurate, and you consent to the services checked above.
        </Text>
      </Stack>
   
  );
}