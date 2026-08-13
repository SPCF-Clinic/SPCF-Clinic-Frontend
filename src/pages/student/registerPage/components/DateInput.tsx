import { useState } from "react";
import { Group, Select, Input } from "@mantine/core";

interface DateInputProps {
  label: string;
}

export default function DateInput({ label }: DateInputProps) {
  const [month, setMonth] = useState<string | null>(null);
  const [day, setDay] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
  const years = Array.from({ length: 100 }, (_, i) => String(2026 - i));

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
      <Group gap={0} wrap="nowrap">
        <Select
          placeholder="Month"
          data={months}
          value={month}
          onChange={setMonth}
          styles={{
            input: {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderRight: "none",
              "&:focus": {
                zIndex: 1,
              },
            },
          }}
        />
        <Select
          placeholder="Day"
          data={days}
          value={day}
          onChange={setDay}
          styles={{
            input: {
              borderRadius: 0,
              borderRight: "none",
              "&:focus": {
                zIndex: 1,
              },
            },
          }}
        />

        <Select
          placeholder="Year"
          data={years}
          value={year}
          onChange={setYear}
          styles={{
            input: {
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              "&:focus": {
                zIndex: 1,
              },
            },
          }}
        />
      </Group>
    </Input.Wrapper>
  );
}
