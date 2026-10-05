import {
  Box,
  Combobox,
  Group,
  Input,
  Loader,
  Stack,
  Text,
  TextInput,
  useCombobox,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import { enumQueries } from "@/query/enums";
import { FIELD_BACKGROUND } from "./constants";

const MAX_VISIBLE_OPTIONS = 10;

const filledInputStyles = {
  input: {
    backgroundColor: FIELD_BACKGROUND,
    borderRadius: "var(--mantine-radius-sm)",
  },
};

interface CheckInOption {
  value: string;
  label: string;
  subLabel: string;
}

interface CheckInSelectProps {
  value: number | null;
  error: React.ReactNode;
  onChange: (value: number) => void;
  onClearError: () => void;
}

export default function CheckInSelect({
  value,
  error,
  onChange,
  onClearError,
}: CheckInSelectProps) {
  const {
    data: options = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    ...enumQueries.checkIns(),
    enabled: false,
    select: ({ data }): CheckInOption[] =>
      data.map((checkIn) => ({
        value: String(checkIn.id),
        label: checkIn.user.name,
        subLabel:
          checkIn.user.grade_level ??
          `${checkIn.user.year_level} | ${checkIn.user.course}`,
      })),
  });

  const [search, setSearch] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedValue = value?.toString() ?? null;
  const selectedOption = options.find(
    (option) => option.value === selectedValue,
  );

  const checkInError =
    error ??
    (isError ? "Unable to load students. Please try again." : undefined);

  const combobox = useCombobox({
    onDropdownClose: () => {
      setSearch("");
      combobox.resetSelectedOption();
    },
    onDropdownOpen: () => {
      refetch().then(() => combobox.resetSelectedOption());
    },
  });

  useEffect(() => {
    if (combobox.dropdownOpened) {
      requestAnimationFrame(() => searchInputRef.current?.focus());
    }
  }, [combobox.dropdownOpened]);

  const query = search.trim().toLowerCase();

  const filteredOptions = options
    .filter(
      (option) =>
        !query ||
        option.label.toLowerCase().includes(query) ||
        option.subLabel.toLowerCase().includes(query),
    )
    .slice(0, MAX_VISIBLE_OPTIONS);

  const handleSelect = (optionValue: string) => {
    onChange(Number(optionValue));
    onClearError();
    setSearch("");
    combobox.closeDropdown();
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        combobox.selectNextOption();
        break;
      case "ArrowUp":
        event.preventDefault();
        combobox.selectPreviousOption();
        break;
      case "Enter":
        event.preventDefault();
        combobox.clickSelectedOption();
        break;
      case "Escape":
        event.preventDefault();
        combobox.closeDropdown();
        break;
    }
  };

  return (
    <Box>
      <Combobox
        store={combobox}
        withinPortal={false}
        onOptionSubmit={handleSelect}
      >
        <Combobox.Target>
          {combobox.dropdownOpened ? (
            <TextInput
              styles={filledInputStyles}
              placeholder="Select student"
              size="lg"
              ref={searchInputRef}
              value={search}
              onChange={(event) => {
                setSearch(event.currentTarget.value);
                onClearError();
                combobox.updateSelectedOptionIndex();
              }}
              onKeyDown={handleSearchKeyDown}
              error={checkInError}
              rightSection={
                isLoading ? <Loader size={18} /> : <Combobox.Chevron />
              }
              rightSectionPointerEvents="none"
            />
          ) : (
            <Input
              variant="filled"
              styles={filledInputStyles}
              component="button"
              type="button"
              pointer
              error={!!checkInError}
              disabled={isLoading}
              onClick={() => {
                onClearError();
                combobox.toggleDropdown();
              }}
              rightSection={
                isLoading ? <Loader size={18} /> : <Combobox.Chevron />
              }
              rightSectionPointerEvents="none"
              size="lg"
            >
              {selectedOption ? (
                <Stack gap={1}>
                  <Text fw={600} c="primary" lh={1.2}>
                    {selectedOption.label}
                  </Text>

                  <Text size="xs" c="dimmed" lh={1}>
                    {selectedOption.subLabel}
                  </Text>
                </Stack>
              ) : (
                <Input.Placeholder>Select student</Input.Placeholder>
              )}
            </Input>
          )}
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            {isLoading ? (
              <Combobox.Empty>Loading...</Combobox.Empty>
            ) : isError ? (
              <Combobox.Empty>Unable to load students</Combobox.Empty>
            ) : filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const checked = option.value === selectedValue;

                return (
                  <Combobox.Option
                    key={option.value}
                    value={option.value}
                    active={checked}
                  >
                    <Group flex="1" gap="xs">
                      <Stack gap={1}>
                        <Text fw={600} c={checked ? "primary" : undefined} lh={1.2}>
                          {option.label}
                        </Text>

                        <Text size="xs" c="dimmed" lh={1}>
                          {option.subLabel}
                        </Text>
                      </Stack>

                      {checked && (
                        <IconCheck
                          style={{ marginInlineStart: "auto" }}
                          color="#294987"
                          opacity={0.6}
                          size={18}
                        />
                      )}
                    </Group>
                  </Combobox.Option>
                );
              })
            ) : (
              <Combobox.Empty>No students found</Combobox.Empty>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>

      {!combobox.dropdownOpened && checkInError && (
        <Input.Error size="md" mt={5}>
          {checkInError}
        </Input.Error>
      )}
    </Box>
  );
}
