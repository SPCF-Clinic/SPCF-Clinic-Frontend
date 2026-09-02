import { Text } from "@mantine/core";

import type { AdditionalField, DisplayField } from "@/types/students";
import { renderStudentValue } from "@/utils/students/studentValue";
import { StudentInfoRow } from "./StudentInfoLayout";

type FieldRowVariant = "default" | "indented" | "medical";

type FieldRowProps = {
	field: DisplayField;
	variant?: FieldRowVariant;
	secondaryField?: DisplayField;
};

function hasValue(
	additionalField: AdditionalField,
): additionalField is AdditionalField & { value: string } {
	return additionalField.value !== null;
}

export function FieldRow({
	field,
	variant = "default",
	secondaryField,
}: FieldRowProps) {
	switch (variant) {
		case "indented":
			return <IndentedField field={field} secondaryField={secondaryField} />;

		case "medical":
			return <MedicalField field={field} />;

		default:
			return <DefaultField field={field} />;
	}
}

function DefaultField({ field }: { field: DisplayField }) {
	const additionalFields = field.additional_fields.filter(hasValue);

	return (
		<>
			<StudentInfoRow
				label={field.name}
				value={renderStudentValue(field.value)}
			/>

			{additionalFields.map((additionalField) => (
				<StudentInfoRow
					key={additionalField.id}
					label={additionalField.name}
					value={renderStudentValue(additionalField.value)}
				/>
			))}
		</>
	);
}

function IndentedField({
	field,
	secondaryField,
}: {
	field: DisplayField;
	secondaryField?: DisplayField;
}) {
	return (
		<StudentInfoRow
			label={field.name}
			value={
				<>
					{renderStudentValue(field.value)}

					{secondaryField && (
						<Text
							size="sm"
							fs="italic"
							c="dimmed"
							style={{
								lineHeight: 1.4,
								overflowWrap: "anywhere",
							}}
						>
							{renderStudentValue(secondaryField.value)}
						</Text>
					)}
				</>
			}
		/>
	);
}

function MedicalField({ field }: { field: DisplayField }) {
	const additionalFields = field.additional_fields.filter(hasValue);

	return (
		<StudentInfoRow
			label={field.name}
			value={
				<>
					<Text
						size="sm"
						fw={500}
						style={{
							lineHeight: 1.4,
							overflowWrap: "anywhere",
						}}
					>
						{renderStudentValue(field.value, "MM/YYYY")}
					</Text>

					{additionalFields.map((additionalField) => (
						<Text
							key={additionalField.id}
							size="sm"
							fs="italic"
							c="dimmed"
							style={{
								lineHeight: 1.4,
								overflowWrap: "anywhere",
							}}
						>
							{additionalField.name === "Vaccine Name"
								? renderStudentValue(additionalField.value, "MM/YYYY")
								: `${additionalField.name}: ${renderStudentValue(
										additionalField.value,
										"MM/YYYY",
									)}`}
						</Text>
					))}
				</>
			}
		/>
	);
}
