import { SegmentedControl, Input } from "@mantine/core";

interface RadioInputProps {
  label: string;
  data: Array<string | { id: number; value: string }>;
  value?: string;
  error?: React.ReactNode;
  withAsterisk?: boolean;
  onChange?: (value: string) => void;
}

export default function RadioInput({
  label,
  data,
  value,
  error,
  withAsterisk,
  onChange,
}: RadioInputProps) {
  const options = data.map((option) =>
    typeof option === "string"
      ? { label: option, value: option }
      : { label: option.value, value: option.value },
  );

  return (
    <Input.Wrapper
      label={label}
      error={error}
      withAsterisk={withAsterisk}
      mb={5}
      styles={{
        label: {
          fontWeight: 600,
          color: "var(--mantine-color-gray-7)",
          fontSize: "13px",
          marginBottom: 4,
        },
      }}
    >
      <SegmentedControl
        fullWidth
        value={value ?? ""}
        onChange={(val) => {
          onChange?.(val);
        }}
        data={options}
        styles={{
          root: {
            border: error
              ? "1px solid var(--mantine-color-red-6)"
              : "1px solid var(--mantine-color-gray-4)",
            backgroundColor: "var(--mantine-color-white)",
          },
          indicator: {
            backgroundColor: "var(--mantine-color-blue-1)",
          },
          label: {
            fontWeight: 500,
            "&[dataActive]": {
              color: "var(--mantine-color-blue-7)",
            },
          },
        }}
      />
    </Input.Wrapper>
  );
}