import { Stack } from "@mantine/core";

import type { PersonalInfoApiResponse } from "../../../../types/register.form.field";
import { data_type } from "../../utils/register.form";

import TextInput1 from "../components/TextInput";
import DateInput from "../components/DateInput";
import RadioInput from "../components/RadioInput";
import DropdownInput from "../components/DropdownInput";
import SectionDivider from "../components/Divider";

interface Step_1Props {
  data: PersonalInfoApiResponse;
}

export default function Step_1({ data}: Step_1Props) {
  const Map_Data = () => {
    return data.data.map((items) => {
      const typeLabel = data_type(items.type.name);

      return (
        <Stack key={items.id} gap="md">
          {typeLabel === "Divider" && <SectionDivider label={items.name} />}
          {typeLabel === "Text" && <TextInput1 label={items.name} />}
          {typeLabel === "Date" && <DateInput label={items.name} />}
          {typeLabel === "Radio" && (
            <RadioInput label={items.name} data={items.options} />
          )}
          {typeLabel === "Dropdown" && (
            <DropdownInput label={items.name} data={items.options} />
          )}
        </Stack>
      );
    });
  };

  return <>{Map_Data()}</>;
}
