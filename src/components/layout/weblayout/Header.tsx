import { AppShell, ActionIcon, Flex, Image, Text } from "@mantine/core";

import {  IconMenu2 } from "@tabler/icons-react";


type HeaderProps = {
  opened: boolean;
  onClick: () => void;
};

export default function Header({ opened, onClick }: HeaderProps) {


  return (
    <AppShell.Header >
      <Flex h="100%" align="center" justify={"space-between"}>
        <ActionIcon onClick={onClick} variant="transparent" size={60}>
          <IconMenu2
          size={30}
          color={"black"}
          />
        </ActionIcon>

        
      </Flex>
    </AppShell.Header>
  );
}
