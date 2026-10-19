import type { Field } from "@/types/students";

const NAME_FIELDS = new Set(["First Name", "Middle Name", "Last Name"]);

export function getPersonalInfoWithoutName(fields: Field[]) {
	return fields.filter((field) => !NAME_FIELDS.has(field.name));
}
