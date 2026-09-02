import { use } from "react";

import { PrintContext } from "@/context/PrintContext";

export function usePrintContext() {
	const context = use(PrintContext);

	if (!context) {
		throw new Error("usePrintContext must be used within a PrintProvider");
	}

	return context;
}
