import { Center, Loader } from "@mantine/core";

import QueryError from "@/components/QueryError";
import { usePersonalInfo } from "@/query/student-register";
import ReorderableFields from "./ReorderableFields";

export default function PersonalInfoPanel() {
  const { data, isPending, error, refetch } = usePersonalInfo();

  if (error) return <QueryError error={error} onRetry={refetch} />;

  if (isPending)
    return (
      <Center>
        <Loader />
      </Center>
    );

  return <ReorderableFields fields={data.data} type="Personal" />;
}
