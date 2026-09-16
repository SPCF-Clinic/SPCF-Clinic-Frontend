import { use } from "react";

import { DashboardAsideContext } from "@/context/DashboardAsideContext";

export function useDashboardAsideContext() {
	const context = use(DashboardAsideContext);
	if (!context) {
		throw new Error(
			"useDashboardAsideContext must be used within a DashboardAsideProvider",
		);
	}
	return context;
}
