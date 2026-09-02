import { type AxiosError, isAxiosError } from "axios";
import type { ApiErrorResponse } from "@/types/api";

export const isApiError = (
	error: unknown,
): error is AxiosError<ApiErrorResponse> => {
	return isAxiosError(error);
};
