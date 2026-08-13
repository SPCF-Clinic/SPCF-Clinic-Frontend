import { Select, Input } from "@mantine/core";

interface DropdownInputProps {
  label: string;
  data: string[];
}

export default function DropdownInput({ label, data }: DropdownInputProps) {
  console.log(data);
  return (
    <Input.Wrapper
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
    >
      <Select data={data} />
    </Input.Wrapper>
  );
}
