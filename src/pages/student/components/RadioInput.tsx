import { SegmentedControl, Input } from "@mantine/core";

interface RadioInputProps {
  label: string;
  data: string[];
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
        data={data ?? []}
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