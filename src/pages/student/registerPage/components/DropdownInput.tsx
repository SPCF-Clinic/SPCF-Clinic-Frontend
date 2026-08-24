import { Select, Input } from "@mantine/core";

interface DropdownInputProps {
  label: string;
  data: string[];
  value?: string;
  onChange?: (value: string) => void;
}

export default function DropdownInput({ label, data, value, onChange }: DropdownInputProps) {
  console.log(data);

  const handleOnChange = () => {

  }
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
      <Select data={data} value={value} onChange={(value : any) => {
          onChange?.(value);
        }}/>
    </Input.Wrapper>
  );
}
