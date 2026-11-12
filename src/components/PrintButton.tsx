import { Button, type ButtonProps } from "@mantine/core";
import { IconPrinter } from "@tabler/icons-react";
import { type UseReactToPrintOptions, useReactToPrint } from "react-to-print";

interface PrintButtonProps extends Omit<ButtonProps, "onClick"> {
  printOptions: UseReactToPrintOptions;
}

export function PrintButton({
  children = "Print",
  leftSection = <IconPrinter size={20} />,
  printOptions,
  ...buttonProps
}: PrintButtonProps) {
  const bodyClass = `print-container${printOptions.bodyClass ? ` ${printOptions.bodyClass}` : ""}`;
  const handlePrint = useReactToPrint({
    ...printOptions,
    bodyClass,
    print: async (target) => {
      target.contentDocument?.documentElement.setAttribute("data-mantine-color-scheme", "light");

      // react-to-print only applies `documentTitle` on its own print path,
      // which this custom `print` replaces. Set it here so "Save as PDF"
      // uses the document title instead of the page title.
      const title =
        typeof printOptions.documentTitle === "function"
          ? printOptions.documentTitle()
          : printOptions.documentTitle;
      const previousPageTitle = document.title;
      const previousFrameTitle = target.contentDocument?.title ?? "";

      if (title) {
        document.title = title;
        if (target.contentDocument) target.contentDocument.title = title;
      }

      try {
        if (printOptions.print) {
          await printOptions.print(target);
        } else {
          target.contentWindow?.print();
        }
      } finally {
        if (title) {
          document.title = previousPageTitle;
          if (target.contentDocument) {
            target.contentDocument.title = previousFrameTitle;
          }
        }
      }
    },
  });

  return (
    <Button
      leftSection={leftSection}
      onClick={handlePrint}
      variant="outline"
      color="gray"
      className="no-print"
      {...buttonProps}
    >
      {children}
    </Button>
  );
}
