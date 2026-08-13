import { Box, Flex, Text } from "@mantine/core";

import { dayjs } from "@/services/dayjs";

interface ActivityProps {
  action: string;
  date: string;
}

export default function Activity({ action, date }: ActivityProps) {
  return (
    <Flex gap="sm">
      <Box bdrs={2} bg="primary" w={4} />
      <Box py="xs">
        <Text fw={500}>{action}</Text>
        <Text lh={1} c="dimmed">
          {dayjs(date).format("MM-DD-YYYY LT")}
        </Text>
      </Box>
    </Flex>
  );
}
