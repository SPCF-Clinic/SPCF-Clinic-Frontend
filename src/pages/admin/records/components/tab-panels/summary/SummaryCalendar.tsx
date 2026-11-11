
import { useState } from "react";
import dayjs from "dayjs";
import { IconCalendarWeekFilled } from "@tabler/icons-react";
import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Popover,
  Stack,
  Text,
} from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { usePrintContext } from "@/hooks/context/usePrintContext";
import { PrintButton } from "@/components/PrintButton";

interface SummaryCalendarProps {
  onApply: (payload: {
    date_from: string;
    date_to: string;
  }) => void;
}

function SelectableCalendar({
  onApply,
  onClose,
}: {
  onApply: SummaryCalendarProps["onApply"];
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (date: string) => {
    const isSelected = selected.some((s) =>
      dayjs(date).isSame(s, "date")
    );

    if (isSelected) {
      setSelected((current) =>
        current.filter((d) => !dayjs(d).isSame(date, "date"))
      );
    } else if (selected.length < 2) {
      setSelected((current) => [...current, date]);
    } else {
      setSelected([date]);
    }
  };

  const sortedDates = [...selected].sort((a, b) =>
    dayjs(a).diff(dayjs(b))
  );

  const handleApply = () => {
    onApply({
      date_from: sortedDates[0] ?? "",
      date_to: sortedDates[1] ?? "",
    });

    onClose();
  };

  return (
    <Stack gap="sm">
      <Text fw={600} size="sm">
        Select reporting period
      </Text>

      <Calendar
        getDayProps={(date) => ({
          selected: selected.some((s) =>
            dayjs(date).isSame(s, "date")
          ),
          onClick: () => handleSelect(date),
        })}
      />

      <Stack gap={4}>
        <Text size="xs" c="dimmed">
          Selected date range
        </Text>

        <Text size="sm" fw={500}>
          From: {sortedDates[0]
            ? dayjs(sortedDates[0]).format("MMM DD, YYYY")
            : "Not selected"}
        </Text>

        <Text size="sm" fw={500}>
          To: {sortedDates[1]
            ? dayjs(sortedDates[1]).format("MMM DD, YYYY")
            : "Not selected"}
        </Text>
      </Stack>

      <Group justify="space-between">
        <Button
          variant="subtle"
          color="gray"
          size="xs"
          onClick={() => setSelected([])}
        >
          Clear
        </Button>

        <Button
          size="xs"
          disabled={selected.length === 0}
          onClick={handleApply}
        >
          Apply
        </Button>
      </Group>
    </Stack>
  );
}

export default function SummaryCalendar({
  onApply,
}: SummaryCalendarProps) {
     const { contentRef } = usePrintContext();
  const [opened, setOpened] = useState(false);

  return (
    <Flex w="100%" justify="flex-end" align={"center"} gap={10} mb={10}>
        <PrintButton printOptions={{ contentRef }} />
      <Popover
        opened={opened}
        onChange={setOpened}
        position="left"
        withArrow
      >
        <Popover.Target>
          <ActionIcon
            variant="subtle"
            onClick={() => setOpened((o) => !o)}
          >
            <IconCalendarWeekFilled />
          </ActionIcon>
        </Popover.Target>

        <Popover.Dropdown>
          <SelectableCalendar
            onApply={onApply}
            onClose={() => setOpened(false)}
          />
        </Popover.Dropdown>
      </Popover>
    </Flex>
  );
}
