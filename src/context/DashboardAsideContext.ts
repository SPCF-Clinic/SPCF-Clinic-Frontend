import { createContext } from "react";

export interface DashboardAsideContextValue {
	active: boolean;
}

export const DashboardAsideContext =
	createContext<DashboardAsideContextValue | null>(null);
