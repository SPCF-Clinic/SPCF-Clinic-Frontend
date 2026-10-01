import { Center, Loader } from "@mantine/core";

import QueryError from "@/components/QueryError";
import { useFieldList } from "@/hooks/fields/useFieldList";
import ReorderableFields from "./ReorderableFields";

export default function MedicalPanel() {
	const { data, isPending, error, refetch } = useFieldList("Medical");

	if (error) return <QueryError error={error} onRetry={refetch} />;

	if (isPending)
		return (
			<Center mih={120}>
				<Loader />
			</Center>
		);

	return <ReorderableFields fields={data.data} type="Medical" />;
}
