import { ActionIcon, Menu } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";

export default function RowActions() {
  return (
    <Menu>
      <Menu.Target>
        <ActionIcon
          variant="transparent"
          color="gray"
          size="sm"
          aria-label="actions"
          onClick={(e) => e.stopPropagation()}
        >
          <IconDots />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown></Menu.Dropdown>
    </Menu>
  );
}
