import { Center, Loader } from "@mantine/core";

import QueryError from "@/components/QueryError";
import { useMedicalInfo } from "@/query/student-register";
import ReorderableFields from "./ReorderableFields";

export default function MedicalPanel() {
	const { data, isPending, error, refetch } = useMedicalInfo();

	if (error) return <QueryError error={error} onRetry={refetch} />;

	if (isPending)
		return (
			<Center>
				<Loader />
			</Center>
		);

	return <ReorderableFields fields={data.data} type="Medical" />;
}
