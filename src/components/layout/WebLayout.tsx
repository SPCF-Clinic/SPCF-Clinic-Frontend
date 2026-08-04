import { useDisclosure } from "@mantine/hooks";
import { AppShell } from "@mantine/core";

import { useTheme } from "../../context/ThemeContext";

import Header from "./weblayout/Header";
import SideBar from "./weblayout/SideBar";
import Main from "./weblayout/Main";

export default function WebLayout() {
  const [opened, { toggle }] = useDisclosure(false);
  const { colors,} = useTheme();
  return (
    <AppShell
    withBorder={true}
      header={{ height: 60,}}
      navbar={{
        width: 350,
        breakpoint: "sm",
        collapsed: { desktop: !opened, mobile: !opened },
        
      }}
      styles={{
        main: {
          backgroundColor: colors.bgBase,
        },
         header: {
          backgroundColor: colors.bgBase,
        },
        navbar: {
          backgroundColor: colors.bgBase,
        },
      }}
    >
      <Header opened={opened} onClick={() => toggle()} />
      <SideBar />
      <Main />
    </AppShell>
  );
}
