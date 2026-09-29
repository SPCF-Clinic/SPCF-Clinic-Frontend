import type { FieldType } from "@/api/fields";
import { AppModal } from "@/components/AppModal";
import type { FormField } from "@/types/student-register";
import PhonePreview from "./PhonePreview";
import PreviewStep from "./PreviewStep";

interface PreviewModalProps {
	opened: boolean;
	onClose: () => void;
	fields: FormField[];
	type: FieldType;
}

export default function PreviewModal({
	opened,
	onClose,
	fields,
	type,
}: PreviewModalProps) {
	return (
		<AppModal
			opened={opened}
			onClose={onClose}
			size={420}
			contentProps={{ p: 0 }}
			bodyProps={{ p: 0 }}
			title="Preview"
		>
			<PhonePreview>
				<PreviewStep fields={fields} type={type} />
			</PhonePreview>
		</AppModal>
	);
}
