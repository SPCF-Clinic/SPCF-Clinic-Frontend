import { PieChart } from "@mantine/charts";
import { Stack, Text } from "@mantine/core";

interface DistributionItem {
  label: string;
  count: number;
  percentage: number;
}

interface DistributionPieChartProps {
  title: string;
  data: DistributionItem[];
}

export default function DistributionPieChart({
  title,
  data,
}: DistributionPieChartProps) {
    const getChartColor = (index: number, total: number) => {
  const hue = (index * 360) / total;
  return `hsl(${hue}, 65%, 55%)`;
};
  const chartData = data.map((item, index) => ({
    name: `${item.label} (${item.count})`,
    value: item.count,
    color:getChartColor(index, data.length),
  }));

    const chartHeight = Math.max(300, data.length * 25 + 200);

  return (
    <Stack>
      <Text fw={600} ta={"left"} w={"100%"} bg="gray.2">
        {title}
      </Text>
      <Stack align={"center"}>
        {data.length === 0 ? (
          <Text c="dimmed" ta="center" py="xl">
            No data available
          </Text>
        ) : (
          <PieChart w={"60%"} h={chartHeight} data={chartData} withTooltip withLegend withLabels labelsType="percent" labelsPosition="outside"/>
        )}
      </Stack>
    </Stack>
  );
}
