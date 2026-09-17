import { Select, Input } from "@mantine/core";

interface DropdownInputProps {
  label: string;
  data: Array<string | { value: string; label?: string }>;
  value?: string;
  error?: React.ReactNode;
  withAsterisk?: boolean;
  onChange?: (value: string) => void;
}

export default function DropdownInput({
  label,
  data,
  value,
  error,
  withAsterisk,
  onChange,
}: DropdownInputProps) {
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
      <Select
        data={(data ?? []).map((option) =>
          typeof option === "string"
            ? option
            : { value: option.value, label: option.label ?? option.value },
        )}
        value={value ?? ""}
        error={!!error}
        onChange={(val) => {
          if (val !== null) {
            onChange?.(val);
          }
        }}
        clearable
      />
    </Input.Wrapper>
  );
}