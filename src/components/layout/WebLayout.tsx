import { useDisclosure } from "@mantine/hooks";
import { AppShell } from "@mantine/core";

import Header from "./weblayout/Header";
import SideBar from "./weblayout/SideBar";
import Main from "./weblayout/Main";

export default function WebLayout() {
  const [opened, { toggle }] = useDisclosure(false);
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
          backgroundColor: "#ffffff",
        },
         header: {
          backgroundColor: "#ffffff",
        },
        navbar: {
          backgroundColor: "#ffffff",
        },
      }}
    >
      <Header opened={opened} onClick={() => toggle()} />
      <SideBar />
      <Main />
    </AppShell>
  );
}
