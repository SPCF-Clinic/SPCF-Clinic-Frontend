import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {  Flex, Text} from "@mantine/core";

import type { CheckInReportPayload } from "@/types/check-ins";
import { checkInQueries } from "@/query/check-ins";

import SummaryCalendar from "./SummaryCalendar";
import SummaryChart from "./SummaryChart";

export default function Summary() {
   
  const [payload, setPayload] = useState<CheckInReportPayload>({
    date_from: "",
    date_to: "",
  });

  console.log("payload", payload);

  const { data, isPending } = useQuery({
    ...checkInQueries.report(payload),
    enabled: !!payload.date_from,
  });
  return (
    <>
    
      <SummaryCalendar onApply={setPayload} />
      {isPending ? <Text ta={"center"}>Please pick a date...</Text>: ""}
      {data && <SummaryChart data={data.data} />}
    </>
  );
}
