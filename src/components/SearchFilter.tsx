import {
	ActionIcon,
	Menu,
	TextInput,
	type TextInputProps,
} from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { IconFilter2 } from "@tabler/icons-react";
import { useQueryState } from "nuqs";
import { useState } from "react";

interface FilterMenuItem {
	label: string;
	value: string;
	onClick?: () => void;
}

interface SearchFilterProps {
	queryKey?: string;
	defaultValue?: string;
	numeric?: boolean;
	menuItems?: FilterMenuItem[];
	debounceMs?: number;
	textInputProps?: TextInputProps;
	sanitize?: (value: string) => string;
}

export function SearchFilter({
	queryKey = "search",
	menuItems,
	numeric = false,
	defaultValue = "",
	debounceMs = 300,
	textInputProps,
	sanitize,
}: SearchFilterProps) {
	const [queryValue, setQueryValue] = useQueryState(queryKey, {
		defaultValue,
	});

	const [searchValue, setSearchValue] = useState(queryValue);
	const [prevQueryValue, setPrevQueryValue] = useState(queryValue);

	if (queryValue !== prevQueryValue) {
		setPrevQueryValue(queryValue);
		setSearchValue(queryValue);
	}

	const updateUrlParam = useDebouncedCallback((value: string) => {
		setQueryValue(value.trim() || null);
	}, debounceMs);

	const handleSearchChange: React.ChangeEventHandler<
		HTMLInputElement,
		HTMLInputElement
	> = (e) => {
		let value = e.currentTarget.value;

		if (sanitize) {
			value = sanitize(value);
		} else if (numeric) {
			value = value.replace(/\D/g, "");
		}

		setSearchValue(value);
		updateUrlParam(value);
	};

	return (
		<TextInput
			className={searchValue ? undefined : "no-print"}
			placeholder="Search"
			w={300}
			value={searchValue}
			onChange={handleSearchChange}
			rightSection={menuItems ? <FilterMenu items={menuItems} /> : undefined}
			{...textInputProps}
		/>
	);
}

interface FilterMenuProps {
	items: FilterMenuItem[];
}

function FilterMenu({ items }: FilterMenuProps) {
	if (!items.length) {
		return null;
	}

	return (
		<Menu withinPortal>
			<Menu.Target>
				<ActionIcon size="sm" variant="transparent">
					<IconFilter2 size={16} />
				</ActionIcon>
			</Menu.Target>

			<Menu.Dropdown>
				{items.map((item) => (
					<Menu.Item key={item.value} onClick={item.onClick}>
						{item.label}
					</Menu.Item>
				))}
			</Menu.Dropdown>
		</Menu>
	);
}
