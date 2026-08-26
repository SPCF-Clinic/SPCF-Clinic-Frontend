import { Button, type ButtonProps } from "@mantine/core";
import { IconPrinter } from "@tabler/icons-react";

export function PrintButton({
  children = "Print",
  leftSection = <IconPrinter size={20} />,
  ...buttonProps
}: Omit<ButtonProps, "onClick">) {
  return (
    <Button
      leftSection={leftSection}
      onClick={() => window.print()}
      variant="outline"
      color="gray"
      {...buttonProps}
    >
      {children}
    </Button>
  );
}
