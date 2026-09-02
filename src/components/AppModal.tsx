import {
	Box,
	Divider,
	Modal,
	type ModalBodyProps,
	type ModalContentProps,
	type ModalRootProps,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";

interface AppModalProps extends ModalRootProps {
	title: React.ReactNode;
	contentProps?: ModalContentProps;
	bodyProps?: ModalBodyProps;
	footer?: React.ReactNode;
}

export function AppModal({
	title,
	contentProps,
	bodyProps,
	children,
	footer,
	...props
}: AppModalProps) {
	return (
		<Modal.Root centered {...props}>
			<Modal.Overlay />

			<Modal.Content {...contentProps}>
				<Box
					style={{
						position: "sticky",
						top: 0,
						zIndex: 10,
						background: "var(--mantine-color-body)",
					}}
				>
					<Modal.Header p="lg" pb="sm">
						<Modal.Title fz={20} fw={600}>
							{title}
						</Modal.Title>

						<Modal.CloseButton
							icon={<IconX color="var(--mantine-color-text)" stroke={2.5} />}
						/>
					</Modal.Header>

					<Divider />
				</Box>

				<Modal.Body {...bodyProps}>{children}</Modal.Body>

				{footer}
			</Modal.Content>
		</Modal.Root>
	);
}
