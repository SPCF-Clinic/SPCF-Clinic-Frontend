import { TextInput } from "@mantine/core";

interface TextInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  withAsterisk?: boolean;
  error?: string;
}

export default function TextInput1({
  label,
  value,
  placeholder,
  onChange,
  error,
  withAsterisk,
}: TextInputProps) {
  return (
    <>
      <TextInput
        label={label}
        placeholder={placeholder}
        withAsterisk={withAsterisk}
        value={value}
        onChange={(event) => {
          onChange?.(event.currentTarget.value);
        }}
        error={error}
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
