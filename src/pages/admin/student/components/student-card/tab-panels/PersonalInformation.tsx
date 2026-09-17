import { useMemo } from "react";

import { useStudentDetail } from "@/hooks/students/useStudentDetail";
import type { DisplayField } from "@/types/students";
import {
	getPersonalInfoWithoutName,
	getStudentFullName,
} from "@/utils/students/studentName";
import { FieldRow } from "../FieldRow";
import { StudentInfoColumn, StudentInfoLayout } from "../StudentInfoLayout";
import StudentPersonalInfoForm from "./StudentPersonalInfoForm";

interface PersonalInformationProps {
	isEditing?: boolean;
	onCancelEdit?: () => void;
}

export default function PersonalInformation({
	isEditing = false,
	onCancelEdit,
}: PersonalInformationProps) {
	const { data, isPending, error } = useStudentDetail();

	const fields = useMemo<DisplayField[]>(() => {
		if (!data) {
			return [];
		}

		const personalInfo = [...data.data.personal_info].sort(
			(a, b) => a.form_order - b.form_order,
		);

		const fullName = getStudentFullName(personalInfo);

		return [
			{
				id: "name",
				name: "Name",
				value: fullName,
				additional_fields: [],
			},
			...getPersonalInfoWithoutName(personalInfo),
		];
	}, [data]);

	if (isEditing && data) {
		return (
			<StudentPersonalInfoForm
				studentData={data.data}
				onCancel={onCancelEdit}
			/>
		);
	}

	const guardianContact = fields.find(
		(field) => field.name === "Contact No. of Guardian",
	);

	const midpoint = Math.ceil(
		fields.filter((field) => field.name !== "Contact No. of Guardian").length /
			2,
	);

	const visibleFields = fields.filter(
		(field) => field.name !== "Contact No. of Guardian",
	);

	return (
		<StudentInfoLayout isPending={isPending} error={error}>
			<StudentInfoColumn>
				{visibleFields.slice(0, midpoint).map((field) => (
					<FieldRow
						key={field.id}
						field={field}
						variant={field.name === "Guardian's Name" ? "indented" : "default"}
						secondaryField={
							field.name === "Guardian's Name" ? guardianContact : undefined
						}
					/>
				))}
			</StudentInfoColumn>

			<StudentInfoColumn>
				{visibleFields.slice(midpoint).map((field) => (
					<FieldRow
						key={field.id}
						field={field}
						variant={field.name === "Guardian's Name" ? "indented" : "default"}
						secondaryField={
							field.name === "Guardian's Name" ? guardianContact : undefined
						}
					/>
				))}
			</StudentInfoColumn>
		</StudentInfoLayout>
	);
}
