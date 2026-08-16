import { dayjs } from "@/services/dayjs";

export function renderStudentValue(
  value: string | string[],
  dateFormat = "LL",
) {
  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (dayjs(value, "YYYY-MM-DD", true).isValid()) {
    return dayjs(value).format(dateFormat);
  }

  return value;
}
