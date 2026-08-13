import { useState } from "react";
import { SegmentedControl, Input, Radio } from "@mantine/core";

interface RadioInputProps {
  label: string;
  data: string[];
}

export default function RadioInput({ label, data }: RadioInputProps) {
  const [value, setValue] = useState("");

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
      <SegmentedControl
        fullWidth
        value={value}
        onChange={setValue}
        data={data ?? []}
        styles={{
          root: {
            border: "1px solid var(--mantine-color-gray-4)",
            backgroundColor: "var(--mantine-color-white)",
          },
          indicator: {
            backgroundColor: "var(--mantine-color-blue-1)",
          },
          label: {
            fontWeight: 500,
            "&[data-active]": {
              color: "var(--mantine-color-blue-7)",
            },
          },
        }}
      />
    </Input.Wrapper>
  );
}
