import { DatePickerInput } from "@mantine/dates";
import { useQueryState } from "nuqs";

import { dayjs } from "@/services/dayjs";

const PRESETS = [
  {
    label: "Today",
    value: (): [string, string] => [dayjs().format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD")],
  },
  {
    label: "Yesterday",
    value: (): [string, string] => [
      dayjs().subtract(1, "day").format("YYYY-MM-DD"),
      dayjs().subtract(1, "day").format("YYYY-MM-DD"),
    ],
  },
  {
    label: "Last 7 days",
    value: (): [string, string] => [
      dayjs().subtract(6, "day").format("YYYY-MM-DD"),
      dayjs().format("YYYY-MM-DD"),
    ],
  },
  {
    label: "Last 30 days",
    value: (): [string, string] => [
      dayjs().subtract(29, "day").format("YYYY-MM-DD"),
      dayjs().format("YYYY-MM-DD"),
    ],
  },
  {
    label: "This month",
    value: (): [string, string] => [
      dayjs().startOf("month").format("YYYY-MM-DD"),
      dayjs().endOf("month").format("YYYY-MM-DD"),
    ],
  },
  {
    label: "Last month",
    value: (): [string, string] => [
      dayjs().subtract(1, "month").startOf("month").format("YYYY-MM-DD"),
      dayjs().subtract(1, "month").endOf("month").format("YYYY-MM-DD"),
    ],
  },
];

export function DateRangeFilter() {
  const [date_from, setDateFrom] = useQueryState("date_from", {
    defaultValue: "",
  });
  const [date_to, setDateTo] = useQueryState("date_to", {
    defaultValue: "",
  });

  const value: [string | null, string | null] = [date_from || null, date_to || null];

  const handleChange = ([from, to]: [string | null, string | null]) => {
    setDateFrom(from ?? null);
    setDateTo(to ?? null);
  };

  return (
    <DatePickerInput
      type="range"
      allowSingleDateInRange
      valueFormat="MMM D, YYYY"
      placeholder="Date range"
      value={value}
      onChange={handleChange}
      presets={PRESETS.map((preset) => ({
        label: preset.label,
        value: preset.value(),
      }))}
      clearable
      w={300}
    />
  );
}
