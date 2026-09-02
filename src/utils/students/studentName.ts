import type { Field } from "@/types/students";

const NAME_FIELDS = new Set(["First Name", "Middle Name", "Last Name"]);

function getStringValue(value: Field["value"] | undefined) {
	return typeof value === "string" ? value : undefined;
}

export function getStudentFullName(fields: Field[], fullMiddleName?: boolean) {
	const firstName = fields.find((field) => field.name === "First Name");

	const middleName = fields.find((field) => field.name === "Middle Name");

	const lastName = fields.find((field) => field.name === "Last Name");

	const firstNameValue = getStringValue(firstName?.value);
	const middleNameValue = getStringValue(middleName?.value);
	const lastNameValue = getStringValue(lastName?.value);

	return [
		firstNameValue,
		fullMiddleName && middleNameValue
			? middleNameValue
			: middleNameValue
				? `${middleNameValue.charAt(0)}.`
				: null,
		lastNameValue,
	]
		.filter(Boolean)
		.join(" ");
}

export function getPersonalInfoWithoutName(fields: Field[]) {
	return fields.filter((field) => !NAME_FIELDS.has(field.name));
}
