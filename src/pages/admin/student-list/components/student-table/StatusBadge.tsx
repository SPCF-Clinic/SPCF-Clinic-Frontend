import { Badge, type BadgeProps } from "@mantine/core";

import type { StudentIndex, StudentStatusLabel } from "@/types/students";

type StatusColors = Pick<BadgeProps, "bg" | "color">;

const BADGE_PROPS = {
  size: "xl",
  radius: "xl",
  variant: "outline",
  fw: 400,
  fz: "sm",
  tt: "none",
} satisfies Partial<BadgeProps>;

const STATUS_COLORS: Record<StudentStatusLabel, StatusColors> = {
  "In Clinic": { bg: "green.1", color: "green.8" },
  "Not In Clinic": { bg: "gray.1", color: "gray.7" },
  Archived: { bg: "gray.0", color: "gray.5" },
};

const BED_COLORS: StatusColors = { bg: "blue.1", color: "blue.8" };

const NO_STATUS: StatusColors = { bg: "gray.0", color: "gray.4" };

const isStatusLabel = (status: string): status is StudentStatusLabel =>
  Object.hasOwn(STATUS_COLORS, status);

export default function StatusBadge({
  status,
}: {
  status: StudentIndex["status"];
}) {
  if (!status) {
    return (
      <Badge {...BADGE_PROPS} {...NO_STATUS}>
        &mdash;
      </Badge>
    );
  }

  const colors = isStatusLabel(status) ? STATUS_COLORS[status] : BED_COLORS;

  return (
    <Badge {...BADGE_PROPS} {...colors}>
      {status}
    </Badge>
  );
}
