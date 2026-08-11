import {
  Box,
  Center,
  Group,
  Paper,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { IconUserFilled } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";

import QueryError from "@/components/QueryError";
import { dashboardQueries } from "@/query/dashboard";

export default function DashboardCards() {
  const { data, isPending, error, refetch } = useQuery(
    dashboardQueries.dashboard(),
  );

  if (isPending) {
    return (
      <SimpleGrid cols={{ base: 1, sm: 3 }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <DashboardCardSkeleton key={i} />
        ))}
      </SimpleGrid>
    );
  }

  if (error) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  const stats: DashboardCardProps[] = [
    {
      label: "Currently in Clinic",
      stats: String(data.data.currently_in_clinic_count),
    },
    {
      label: "Students Registered",
      stats: String(data.data.total_students),
    },
    {
      label: "Total Visits",
      stats: String(data.data.total_visits),
    },
  ];

  const cards = stats.map((stat) => (
    <DashboardCard key={stat.label} {...stat} />
  ));

  return <SimpleGrid cols={{ base: 1, sm: 3 }}>{cards}</SimpleGrid>;
}

interface DashboardCardProps {
  label: string;
  stats: string;
}

function DashboardCard({ label, stats }: DashboardCardProps) {
  return (
    <Paper radius="lg" p="lg">
      <Group>
        <Box flex={1}>
          <Text c="dimmed">{label}</Text>
          <Text fw={600} size="xl" fz={26}>
            {stats}
          </Text>
        </Box>

        <Center bg="primary" bdrs="100%" w={36} h={36}>
          <IconUserFilled color="white" size={20} />
        </Center>
      </Group>
    </Paper>
  );
}

function DashboardCardSkeleton() {
  return (
    <Paper radius="lg" p="lg">
      <Group>
        <Stack flex={1}>
          <Skeleton h={17.8} w="67%" />
          <Skeleton h={33.89} w="75%" />
        </Stack>

        <Center bg="primary" bdrs="100%" w={36} h={36}>
          <IconUserFilled color="white" size={20} />
        </Center>
      </Group>
    </Paper>
  );
}
