import { AppShell } from "@mantine/core";
import { useDisclosure, useHover } from "@mantine/hooks";
import { useLocation } from "react-router-dom";

import Aside from "./weblayout/Aside";
import Header from "./weblayout/Header";
import Main from "./weblayout/Main";
import Navbar from "./weblayout/Navbar";

export const NAVBAR_OPENED_WIDTH = 250;
export const NAVBAR_CLOSED_WIDTH = 80;

export const ASIDE_OPENED_WIDTH = 400;
export const ASIDE_CLOSED_WIDTH = 40;

export default function WebLayout() {
	const location = useLocation();
	const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
	const { hovered: navHovered, ref: navRef } = useHover<HTMLDivElement>();
	const { hovered: logoHovered, ref: logoRef } = useHover<HTMLDivElement>();
	const desktopOpened = navHovered || logoHovered;
	const isDashboardPage = location.pathname === "/admin";

	return (
		<AppShell
			withBorder={false}
			layout="default"
			header={{ height: 76 }}
			navbar={{
				width: desktopOpened ? NAVBAR_OPENED_WIDTH : NAVBAR_CLOSED_WIDTH,
				breakpoint: "sm",
				collapsed: { mobile: !mobileOpened },
			}}
			transitionDuration={300}
			transitionTimingFunction="var(--mantine-layout-transition-timing)"
			aside={{
				width: isDashboardPage ? ASIDE_OPENED_WIDTH : ASIDE_CLOSED_WIDTH,
				breakpoint: "md",
				collapsed: { desktop: false, mobile: true },
			}}
		>
			<Header
				mobile={{ opened: mobileOpened, toggle: toggleMobile }}
				desktop={{ opened: desktopOpened }}
				ref={logoRef}
			/>
			<Navbar ref={navRef} />
			<Main />
			<Aside show={isDashboardPage} />
		</AppShell>
	);
}
