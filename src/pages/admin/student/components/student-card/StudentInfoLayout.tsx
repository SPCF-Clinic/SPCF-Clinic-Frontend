import { Box, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import type { ReactNode } from "react";

import QueryError from "@/components/QueryError";

type StudentInfoLayoutProps = {
  isPending: boolean;
  error: unknown;
  children: ReactNode;
};

export function StudentInfoLayout({
  isPending,
  error,
  children,
}: StudentInfoLayoutProps) {
  if (isPending) return;

  if (error) {
    return <QueryError error={error} />;
  }

  return (
    <Box p={{ base: "md", sm: "lg" }} style={{ overflow: "hidden" }}>
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: "md", md: 40 }}>
        {children}
      </SimpleGrid>
    </Box>
  );
}

export function StudentInfoColumn({ children }: { children: ReactNode }) {
  return <Stack gap="lg">{children}</Stack>;
}

export function StudentInfoRow({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <Group align="flex-start" gap="xl" wrap="nowrap">
      <Text
        size="sm"
        c="dimmed"
        style={{
          width: 125,
          minWidth: 125,
          lineHeight: 1.4,
        }}
      >
        {label}
      </Text>

      <Box
        style={{
          flex: 1,
          minWidth: 0,
        }}
      >
        {typeof value === "string" ? (
          <Text
            size="sm"
            fw={500}
            style={{
              lineHeight: 1.4,
              overflowWrap: "anywhere",
            }}
          >
            {value}
          </Text>
        ) : (
          value
        )}
      </Box>
    </Group>
  );
}
