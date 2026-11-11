
import type { CheckInReportResponse } from "@/types/check-ins";
import DistributionBarChart from "./DistributionBarChart";
import DistributionPieChart from "./DistributionPieChart";
import { SimpleGrid } from "@mantine/core";

interface SummaryChartProps {
  data: CheckInReportResponse;
}

export default function SummaryChart({ data }: SummaryChartProps) {
  const chartConfig = [
    {
      key: "age_group",
      title: "Age Group Distribution",
      type: "bar",
    },
    {
      key: "year_level",
      title: "Education Level Distribution",
      type: "bar",
    },
    {
      key: "gender",
      title: "Gender Distribution",
      type: "pie",
    },
    {
      key: "religion",
      title: "Religion Distribution",
      type: "pie",
    },
    {
      key: "nationality",
      title: "Nationality Distribution",
      type: "pie",
    },
    {
      key: "reason_for_visit",
      title: "Reason for Visit",
      type: "pie",
    },
  ] as const;

  console.log(data)

  return (
    <SimpleGrid cols={{ base: 1, sm: 2}} spacing="lg">
      {chartConfig.map((chart) => {
        const chartData = data.distributions[chart.key];

        return (
          <div key={chart.key}>
            {chart.type === "bar" ? (
              <DistributionBarChart
                title={chart.title}
                data={chartData}
              />
            ) : (
              <DistributionPieChart
                title={chart.title}
                data={chartData}
              />
            )}
          </div>
        );
      })}
    </SimpleGrid>
  );
}
