import { Box, Flex, Skeleton, Stack } from "@mantine/core";

export default function ActivitySkeleton() {
  return (
    <Flex gap="sm">
      <Box bdrs={2} bg="primary" w={4} />
      <Stack flex={1} gap={6} py="sm">
        <Skeleton h={16} />
        <Skeleton h={14} w="45%" />
      </Stack>
    </Flex>
  );
}
