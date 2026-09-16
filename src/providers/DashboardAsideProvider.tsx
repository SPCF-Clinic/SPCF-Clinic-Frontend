import type { PropsWithChildren } from "react";

import {
	DashboardAsideContext,
	type DashboardAsideContextValue,
} from "@/context/DashboardAsideContext";

export function DashboardAsideProvider({
	children,
	active,
}: PropsWithChildren & DashboardAsideContextValue) {
	return (
		<DashboardAsideContext.Provider value={{ active }}>
			{children}
		</DashboardAsideContext.Provider>
	);
}
