import { Card, Stack, Text } from "@mantine/core";

import { usePrintContext } from "@/hooks/context/usePrintContext";
import { PrintProvider } from "@/providers/PrintProvider";
import RecordsTabs from "./components/RecordsTabs";

export default function Records() {
  return (
    <PrintProvider>
      <RecordsContent />
    </PrintProvider>
  );
}

function RecordsContent() {
  const { contentRef } = usePrintContext();

  return (
    <Card flex={1} p="lg" radius="lg" withBorder>
      <div ref={contentRef}>
        <Stack>
          <Text component="h2" fw="bold" size="xl">
            Records
          </Text>

          <Card.Section>
            <RecordsTabs />
          </Card.Section>
        </Stack>
      </div>
    </Card>
  );
}
