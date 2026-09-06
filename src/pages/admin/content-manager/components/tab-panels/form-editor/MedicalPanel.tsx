import { useMedicalInfo } from "@/query/student-register";
import ReorderableFields from "./ReorderableFields";

export default function MedicalPanel() {
	const { data } = useMedicalInfo();

	if (!data) return null;

	return (
		<ReorderableFields
			fields={data.data}
			formVersion={data.form_version}
			type="Medical"
		/>
	);
}
