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
			target.contentDocument?.documentElement.setAttribute(
				"data-mantine-color-scheme",
				"light",
			);

			if (printOptions.print) {
				await printOptions.print(target);
			} else {
				target.contentWindow?.print();
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
