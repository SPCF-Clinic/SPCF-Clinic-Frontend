import { useState } from "react";
import { Group, Select, Input } from "@mantine/core";

interface DateInputProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function DateInput({
  label,
  value,
  onChange,
}: DateInputProps) {
  const [month, setMonth] = useState<string | null>(
    value ? value.split("-")[1] : null
  );

  const [day, setDay] = useState<string | null>(
    value ? value.split("-")[2] : null
  );

  const [year, setYear] = useState<string | null>(
    value ? value.split("-")[0] : null
  );

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const days = Array.from(
    { length: 31 },
    (_, i) => String(i + 1).padStart(2, "0")
  );

  const years = Array.from(
    { length: 100 },
    (_, i) => String(2026 - i)
  );

  const updateDate = (
    newMonth: string | null,
    newDay: string | null,
    newYear: string | null
  ) => {
    if (newMonth && newDay && newYear) {
      onChange?.(`${newYear}-${newMonth}-${newDay}`);
    }
  };

  const handleMonthChange = (newMonth: string | null) => {
    setMonth(newMonth);
    updateDate(newMonth, day, year);
  };

  const handleDayChange = (newDay: string | null) => {
    setDay(newDay);
    updateDate(month, newDay, year);
  };

  const handleYearChange = (newYear: string | null) => {
    setYear(newYear);
    updateDate(month, day, newYear);
  };

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
          onChange={handleMonthChange}
          styles={{
            input: {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderRight: "none",
            },
          }}
        />

        <Select
          placeholder="Day"
          data={days}
          value={day}
          onChange={handleDayChange}
          styles={{
            input: {
              borderRadius: 0,
              borderRight: "none",
            },
          }}
        />

        <Select
          placeholder="Year"
          data={years}
          value={year}
          onChange={handleYearChange}
          styles={{
            input: {
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            },
          }}
        />
      </Group>
    </Input.Wrapper>
  );
}