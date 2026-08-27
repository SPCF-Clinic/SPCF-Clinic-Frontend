import { Divider, Text } from "@mantine/core";

interface SectionDividerProps {
  label?: string;
  descriptionLabel?: string;
}

export default function SectionDivider({
  label,
  descriptionLabel,
}: SectionDividerProps) {
  const hasLabel = Boolean(label && label.trim().length > 0);
  return (
    <>
    {hasLabel &&  <Divider
        mt="lg"
        label={label}
        labelPosition="center"
        styles={{
          label: {
            color: "var(--mantine-color-gray-6)",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "1px",
          },
          line: {
            borderColor: "var(--mantine-color-gray-4)",
          },
        }}
      />}
     
  
        <Text fs="italic" c="dimmed" size="xs" mb={20}>
          {descriptionLabel}
        </Text>

    </>
  );
}
