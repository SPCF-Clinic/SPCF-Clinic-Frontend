import { AppShell, ActionIcon, Flex, Image, Text } from "@mantine/core";

import {  IconMenu2 } from "@tabler/icons-react";
import { useTheme } from "../../../context/ThemeContext";


type HeaderProps = {
  opened: boolean;
  onClick: () => void;
};

export default function Header({ opened, onClick }: HeaderProps) {
  const { colors, mode, toggleTheme } = useTheme();

  console.log(mode)
  return (
    <AppShell.Header >
      <Flex h="100%" align="center" justify={"space-between"}>
        <ActionIcon onClick={onClick} variant="transparent" size={60}>
          <IconMenu2
          size={30}
          color={colors.text}
          />
        </ActionIcon>

        
      </Flex>
    </AppShell.Header>
  );
}
