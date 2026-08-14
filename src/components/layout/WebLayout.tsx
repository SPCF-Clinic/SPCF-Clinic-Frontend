import { useDisclosure, useHover } from "@mantine/hooks";
import { AppShell } from "@mantine/core";

import Header from "./weblayout/Header";
import Navbar from "./weblayout/Navbar";
import Main from "./weblayout/Main";
import Aside from "./weblayout/Aside";

export const NAVBAR_OPENED_WIDTH = 250;
export const NAVBAR_CLOSED_WIDTH = 80;

export default function WebLayout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const { hovered: navHovered, ref: navRef } = useHover<HTMLDivElement>();
  const { hovered: logoHovered, ref: logoRef } = useHover<HTMLDivElement>();
  const desktopOpened = navHovered || logoHovered;

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
      transitionDuration={150}
      transitionTimingFunction="cubic-bezier(0.4, 0, 0.2, 1)"
      aside={{
        width: 400,
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
      <Aside />
    </AppShell>
  );
}
