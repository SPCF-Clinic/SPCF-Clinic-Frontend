import { useForm } from "@mantine/form";

import type { FieldType } from "@/api/fields";
import Step1 from "@/pages/student/registerPage/registerForm/Step_1";
import Step2 from "@/pages/student/registerPage/registerForm/Step_2";
import type { FormField } from "@/types/student-register";

interface PreviewFormValues {
	name: string;
	student_id: string;
	password: string;
	personal_info: Record<number, string>;
	medical_history: Record<number, string>;
}

interface PreviewStepProps {
	fields: FormField[];
	type: FieldType;
}

export default function PreviewStep({ fields, type }: PreviewStepProps) {
	const form = useForm<PreviewFormValues>({
		initialValues: {
			name: "",
			student_id: "",
			password: "",
			personal_info: {},
			medical_history: {},
		},
	});

	return type === "Personal" ? (
		<Step1 data={fields} form={form} />
	) : (
		<Step2 data={fields} form={form} />
	);
}
