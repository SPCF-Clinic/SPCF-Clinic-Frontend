import { queryOptions } from "@tanstack/react-query";

import type { FieldType } from "@/api/fields";
import {
	fetchMedicalHistoryField,
	fetchPersonalInfoField,
} from "@/api/student-register";

export const personalInfoFieldQueries = {
	all: () => ["personal-info-fields"],
	lists: () => [...personalInfoFieldQueries.all(), "list"],
	list: () =>
		queryOptions({
			queryKey: [...personalInfoFieldQueries.lists()],
			queryFn: fetchPersonalInfoField,
		}),
};

export const medicalHistoryFieldQueries = {
	all: () => ["medical-history-fields"],
	lists: () => [...medicalHistoryFieldQueries.all(), "list"],
	list: () =>
		queryOptions({
			queryKey: [...medicalHistoryFieldQueries.lists()],
			queryFn: fetchMedicalHistoryField,
		}),
};

export const FIELD_QUERY_KEY = {
	Personal: personalInfoFieldQueries.list().queryKey,
	Medical: medicalHistoryFieldQueries.list().queryKey,
} satisfies Record<FieldType, unknown[]>;
