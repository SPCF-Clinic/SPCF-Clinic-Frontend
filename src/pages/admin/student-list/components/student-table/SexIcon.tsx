import { ThemeIcon } from "@mantine/core";
import {
  IconGenderFemale,
  IconGenderMale,
  type IconProps,
} from "@tabler/icons-react";

import type { StudentIndex } from "@/types/students";

const genderIcon: Record<
  StudentIndex["sex"],
  React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >
> = {
  MALE: IconGenderMale,
  FEMALE: IconGenderFemale,
};

export default function SexIcon({ sex }: { sex: StudentIndex["sex"] }) {
  const IconComponent = genderIcon[sex];
  const color = sex === "FEMALE" ? "red" : "primary";

  return (
    <ThemeIcon
      radius="xl"
      variant="light"
      style={{ border: `1px solid var(--mantine-color-${color}-outline)` }}
      color={color}
    >
      <IconComponent size={16} />
    </ThemeIcon>
  );
}
