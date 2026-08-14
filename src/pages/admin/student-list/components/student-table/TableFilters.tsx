import { ActionIcon, Menu, TextInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { IconFilter2 } from "@tabler/icons-react";
import { useQueryState } from "nuqs";
import { useState } from "react";

export default function TableFilters() {
  const [studentIdParam, setStudentIdParam] = useQueryState("student_id", {
    defaultValue: "",
  });

  const [searchValue, setSearchValue] = useState(studentIdParam);
  const [prevStudentIdParam, setPrevStudentIdParam] = useState(studentIdParam);

  if (studentIdParam !== prevStudentIdParam) {
    setPrevStudentIdParam(studentIdParam);
    setSearchValue(studentIdParam);
  }

  const updateUrlParam = useDebouncedCallback((val: string) => {
    setStudentIdParam(val.trim() || null);
  }, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearchValue(value);
    updateUrlParam(value);
  };

  return (
    <TextInput
      className={searchValue ? undefined : "no-print"}
      type="number"
      placeholder="Search Student Number"
      maw={300}
      rightSection={<FilterMenu />}
      value={searchValue}
      onChange={handleSearchChange}
    />
  );
}

function FilterMenu() {
  return (
    <Menu>
      <Menu.Target>
        <ActionIcon size="sm" variant="transparent">
          <IconFilter2 size={16} />
        </ActionIcon>
      </Menu.Target>
    </Menu>
  );
}
