import { TextInput } from "@mantine/core";

interface TextInputProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function TextInput1({ label, value, onChange }: TextInputProps) {
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
        value={value}
        onChange={(event) => {
          onChange?.(event.currentTarget.value);
        }}
      />
    </>
  );
}
