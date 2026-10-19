import { matchPath, useLocation } from "react-router-dom";

import { formatTitle, ROUTE_TITLES } from "@/constants/titles";

export default function RouteTitle() {
	const { pathname } = useLocation();

	const entry = ROUTE_TITLES.find((route) =>
		matchPath({ path: route.pattern, end: true }, pathname),
	);

	// Routes marked `dynamic` render their own `<title>` from fetched data.
	if (entry?.dynamic) return null;

	return <title>{formatTitle(entry?.title)}</title>;
}
