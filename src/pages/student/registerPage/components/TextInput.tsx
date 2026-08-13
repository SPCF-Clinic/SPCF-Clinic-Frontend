import { TextInput } from "@mantine/core";

interface TextInputProps {
  label: string;
}

export default function TextInput1({ label }: TextInputProps) {
  return (
    <>
      <TextInput
        label={label}
        mb={5}
        styles={{
          label: {
            fontWeight: 600,
            color: "var(--mantine-color-gray-7)",
            fontSize: "13px",
            marginBottom: 4,
          },
        }}
      />
    </>
  );
}
