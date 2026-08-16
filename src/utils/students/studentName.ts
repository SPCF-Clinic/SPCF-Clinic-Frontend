import type { Fields } from "@/types/students";

const NAME_FIELDS = new Set(["First Name", "Middle Name", "Last Name"]);

function getStringValue(value: Fields["value"] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export function getStudentFullName(fields: Fields[]) {
  const firstName = fields.find((field) => field.name === "First Name");

  const middleName = fields.find((field) => field.name === "Middle Name");

  const lastName = fields.find((field) => field.name === "Last Name");

  const firstNameValue = getStringValue(firstName?.value);
  const middleNameValue = getStringValue(middleName?.value);
  const lastNameValue = getStringValue(lastName?.value);

  return [
    firstNameValue,
    middleNameValue ? `${middleNameValue.charAt(0)}.` : null,
    lastNameValue,
  ]
    .filter(Boolean)
    .join(" ");
}

export function getPersonalInfoWithoutName(fields: Fields[]) {
  return fields.filter((field) => !NAME_FIELDS.has(field.name));
}
