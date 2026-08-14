import {
  ColorSwatch,
  Flex,
  Group,
  Text,
  type ColorSwatchProps,
  type GroupProps,
} from "@mantine/core";

const COLORS: { label: string; color: ColorSwatchProps["color"] }[] = [
  { label: "Unoccupied", color: "var(--mantine-color-gray-6)" },
  { label: "Occupied", color: "var(--mantine-color-primary-6)" },
  { label: "Overdue", color: "var(--mantine-color-red-6)" },
];

export default function ColorSwatchLegend(props: GroupProps) {
  return (
    <Group justify="center" align="center" {...props}>
      {COLORS.map((color) => (
        <Flex key={color.color} align="center" gap={8}>
          <ColorSwatch color={color.color} size={12} />
          <Text size="xs" lh={1}>
            {color.label}
          </Text>
        </Flex>
      ))}
    </Group>
  );
}
