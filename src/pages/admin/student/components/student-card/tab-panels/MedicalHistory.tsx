import { useStudentDetail } from "@/hooks/students/useStudentDetail";
import { FieldRow } from "../FieldRow";
import { StudentInfoColumn, StudentInfoLayout } from "../StudentInfoLayout";

export default function MedicalHistory() {
	const { data, isPending, error } = useStudentDetail();

	const fields = [...(data?.data.medical_history ?? [])].sort(
		(a, b) => a.form_order - b.form_order,
	);

	const midpoint = Math.ceil(fields.length / 2);

	return (
		<StudentInfoLayout isPending={isPending} error={error}>
			<StudentInfoColumn>
				{fields.slice(0, midpoint).map((field) => (
					<FieldRow key={field.id} field={field} variant="medical" />
				))}
			</StudentInfoColumn>

			<StudentInfoColumn>
				{fields.slice(midpoint).map((field) => (
					<FieldRow key={field.id} field={field} variant="medical" />
				))}
			</StudentInfoColumn>
		</StudentInfoLayout>
	);
}
