import {
  ActionIcon,
  Badge,
  Box,
  Group,
  Menu,
  MenuItem,
  Text,
  type MenuItemProps,
} from "@mantine/core";
import { IconDots } from "@tabler/icons-react";

interface StudentCardHeaderProps {
  fullName: string;
  studentNumber: string;
}

export default function StudentCardHeader({
  fullName,
  studentNumber,
}: StudentCardHeaderProps) {
  return (
    <Group justify="space-between">
      <Box>
        <Text fw={600} size="xl">
          {fullName}
        </Text>
        <Text size="sm" c="gray.7">
          {studentNumber}
        </Text>
      </Box>
      <Group>
        <Badge
          size="xl"
          variant="outline"
          color="gray.7"
          bg="gray.2"
          fw={400}
          fz="sm"
          tt="none"
        >
          Not In Clinic
        </Badge>
        <ActionMenu />
      </Group>
    </Group>
  );
}

const MENU_ITEMS: MenuItemProps[] = [
  {
    children: "Edit information",
  },
  {
    children: "Change password",
  },
  {
    children: "Archive",
    c: "red",
  },
];

function ActionMenu() {
  return (
    <Menu>
      <Menu.Target>
        <ActionIcon
          variant="transparent"
          color="gray"
          size="sm"
          aria-label="actions"
        >
          <IconDots />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {MENU_ITEMS.map((item, i) => (
          <MenuItem key={i} c="gray.8" {...item} />
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
