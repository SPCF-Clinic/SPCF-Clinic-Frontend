import { Alert } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

/**
 * Says which of the two orders is on screen, whenever the editor holds a
 * reorder the server has not been told about.
 *
 * The Preview is handed the editor's current Field list, which carries Unsaved
 * Order. Rendering that silently would turn the phone into a picture of a form
 * that does not exist yet, and the whole point of the Preview is to answer
 * "what will a student actually see". So while Unsaved Order exists this says
 * plainly that students are still being shown the saved one.
 *
 * It sits outside the phone, above the frame, and never inside it. A notice
 * rendered inside the frame would be part of the student view, which is the
 * one thing the Preview must not misrepresent, and the very mistake this
 * notice exists to prevent.
 */
export default function UnsavedOrderNotice() {
	return (
		<Alert
			variant="light"
			color="yellow"
			title="Unsaved Order"
			icon={<IconAlertTriangle size={18} />}
		>
			Students still see the saved order. Press Save Order to make this what
			students see.
		</Alert>
	);
}
