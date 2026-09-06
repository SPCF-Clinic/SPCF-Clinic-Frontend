import { toast } from "@/components/toast";
import { isApiError } from "./api";

export const showToastError = (
	error: Error,
	defaultMessage: string = "Error",
) => {
	if (isApiError(error)) {
		return toast.error({
			message: error.response?.data.message,
		});
	}
	toast.error({ message: defaultMessage });
};
