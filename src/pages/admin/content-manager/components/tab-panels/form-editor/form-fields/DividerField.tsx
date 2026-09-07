import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

import FormField from "./FormField";

export default function DividerField() {
	return (
		<FormField>
			<ActionIcon
				style={{ alignSelf: "flex-end" }}
				variant="transparent"
				aria-label="Delete field"
				color="gray.9"
				size="sm"
			>
				<IconTrash />
			</ActionIcon>
		</FormField>
	);
}
