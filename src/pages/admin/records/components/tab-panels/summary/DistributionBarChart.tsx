
import { BarChart } from "@mantine/charts";
import { Stack, Text } from "@mantine/core";

interface DistributionItem {
  label: string;
  count: number;
  percentage: number;
}

interface DistributionBarChartProps {
  title: string;
  data: DistributionItem[];
}

export default function DistributionBarChart({
  title,
  data,
}: DistributionBarChartProps) {
  return (
    <Stack>
        <Text fw={600} ta={"left"} w={"100%"} bg="gray.2">{title}</Text>

      {data?.every((item) => item.count === 0)? (
        <Text c="dimmed" ta="center" py="xl">
          No data available
        </Text>
      ) : (
        <BarChart
          h={300}
          data={data}
          dataKey="label"
          series={[
            { name: "count", color: "blue", label: "Check-ins" },
          ]}
          withTooltip
          withYAxis
          withXAxis
          withBarValueLabel
          minBarSize={3}
          valueLabelProps={{
            position: "top",
            fill: "black",
            fontSize: 12,
          }}
          yAxisProps={{
            domain: [0, (max: number) => Math.max(max, 1)],
            allowDecimals: false,
          }}
        />
      )}
    </Stack>
  );
}
