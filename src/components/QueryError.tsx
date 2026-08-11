import { Alert, Button, Text, Stack } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import axios from "axios";

interface QueryErrorProps {
  error: unknown;
  onRetry?: () => void;
}

export default function QueryError({ error, onRetry }: QueryErrorProps) {
  let errorMessage = "An unexpected error occurred.";

  if (axios.isAxiosError(error)) {
    errorMessage =
      error.response?.data?.message || error.message || errorMessage;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <Alert
      variant="light"
      color="red"
      title="Request Failed"
      icon={<IconAlertCircle size={18} />}
    >
      <Stack gap="sm" mt="xs">
        <Text size="sm">{errorMessage}</Text>

        {onRetry && (
          <Button
            onClick={onRetry}
            variant="filled"
            color="red"
            size="xs"
            w="fit-content"
          >
            Try Again
          </Button>
        )}
      </Stack>
    </Alert>
  );
}
