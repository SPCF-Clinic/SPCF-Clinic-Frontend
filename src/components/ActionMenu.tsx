import {
	ActionIcon,
	type ActionIconProps,
	Menu,
	MenuItem,
	type MenuItemProps,
	type PolymorphicComponentProps,
} from "@mantine/core";

import { IconDots } from "@tabler/icons-react";

interface ActionMenuProps {
	items: MenuItemProps[];
	actionIconProps?: PolymorphicComponentProps<"button", ActionIconProps>;
}

export default function ActionMenu({
	items,
	actionIconProps,
}: ActionMenuProps) {
	return (
		<Menu>
			<Menu.Target>
				<ActionIcon
					variant="transparent"
					color="gray"
					size="sm"
					aria-label="actions"
					{...actionIconProps}
				>
					<IconDots />
				</ActionIcon>
			</Menu.Target>

			<Menu.Dropdown>
				{items.map((item, i) => (
					<MenuItem key={i} c="gray.8" {...item} />
				))}
			</Menu.Dropdown>
		</Menu>
	);
}
