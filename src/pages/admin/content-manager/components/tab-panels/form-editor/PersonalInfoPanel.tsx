import { usePersonalInfo } from "@/query/student-register";
import ReorderableFields from "./ReorderableFields";

export default function PersonalInfoPanel() {
	const { data } = usePersonalInfo();

	if (!data) return null;

	return (
		<ReorderableFields
			fields={data.data}
			formVersion={data.form_version}
			type="Personal"
		/>
	);
}
