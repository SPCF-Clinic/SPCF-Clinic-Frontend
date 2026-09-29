import { Modal, Stack } from "@mantine/core";

import type { FieldType } from "@/api/fields";
import type { FormField } from "@/types/student-register";
import PhonePreview from "./PhonePreview";
import PreviewChrome from "./PreviewChrome";
import PreviewStep from "./PreviewStep";
import UnsavedOrderNotice from "./UnsavedOrderNotice";

interface PreviewModalProps {
	opened: boolean;
	onClose: () => void;
	fields: FormField[];
	type: FieldType;
	hasUnsavedOrder: boolean;
}

export default function PreviewModal({
	opened,
	onClose,
	fields,
	type,
	hasUnsavedOrder,
}: PreviewModalProps) {
	return (
		<Modal.Root opened={opened} onClose={onClose} centered>
			<Modal.Overlay />

			<Modal.Content
				p={0}
				styles={{
					content: {
						flex: "0 0 auto",
						background: "transparent",
						boxShadow: "none",
						display: "flex",
						flexDirection: "column",
						overflow: "hidden",
					},
				}}
			>
				<Stack gap="sm" style={{ minHeight: 0 }}>
					{hasUnsavedOrder && <UnsavedOrderNotice />}

					<PhonePreview>
						<PreviewChrome type={type}>
							<PreviewStep fields={fields} type={type} />
						</PreviewChrome>
					</PhonePreview>
				</Stack>
			</Modal.Content>
		</Modal.Root>
	);
}
