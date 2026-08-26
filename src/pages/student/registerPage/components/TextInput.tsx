import { TextInput } from "@mantine/core";

interface TextInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}

export default function TextInput1({ label, value, placeholder, onChange, error }: TextInputProps) {
  return (
    <>
      <TextInput
        label={label}
        placeholder={placeholder}
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
        error={error}
      />
    </>
  );
}
