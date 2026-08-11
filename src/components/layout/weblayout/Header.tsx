import {
  AppShell,
  Group,
  Burger,
  Image,
  Stack,
  Flex,
  Box,
  Text,
} from "@mantine/core";
import spcfLogo from "@/assets/spcf-logo.webp";
import classes from "./Header.module.css";
import { NAVBAR_CLOSED_WIDTH, NAVBAR_OPENED_WIDTH } from "../WebLayout";
import type { UseHoverReturnValue } from "@mantine/hooks";

interface HeaderProps {
  mobile: { opened: boolean; toggle: () => void };
  desktop: { opened: boolean };
  ref: UseHoverReturnValue["ref"];
}

export default function Header({
  mobile: { opened: mobileOpened, toggle: toggleMobile },
  desktop: { opened: desktopOpened },
  ref,
}: HeaderProps) {
  const navWidth = desktopOpened ? NAVBAR_OPENED_WIDTH : NAVBAR_CLOSED_WIDTH;

  return (
    <AppShell.Header pt="md">
      <Group h="100%" px="md" gap="0" wrap="nowrap">
        <Box ref={ref} className={classes.logoHitArea}>
          <Group
            gap={4}
            wrap="nowrap"
            ref={ref}
            className={classes.logoRail}
            style={{ "--nav-w": `${navWidth}px` } as React.CSSProperties}
            data-opened={desktopOpened}
          >
            <Image src={spcfLogo} w={48} />
            <Stack
              align="flex-start"
              gap={0}
              className={classes.logoText}
              data-opened={desktopOpened}
            />
          </Group>
        </Box>

        <Flex flex={1}>
          <Box>
            <Text fw={600} component="h1" fz="28" lh="1">
              Dashboard
            </Text>
            <Text fw={300}>School Clinic and Health Service</Text>
          </Box>
          <Box flex={1}></Box>
        </Flex>
        <Burger
          opened={mobileOpened}
          onClick={toggleMobile}
          hiddenFrom="sm"
          size="sm"
        />
        {/* <Burger
          opened={desktopOpened}
          onClick={toggleDesktop}
          visibleFrom="sm"
          size="sm"
        /> */}
      </Group>
    </AppShell.Header>
  );
}
