import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

import { useFieldContext } from "../contexts/useFieldContext";
import FormField from "./FormField";

export default function DividerField() {
	const field = useFieldContext();

	return (
		<FormField>
			<ActionIcon
				style={{ alignSelf: "flex-end" }}
				variant="transparent"
				aria-label="Delete field"
				color="gray.9"
				size="sm"
				disabled={field?.is_default}
			>
				<IconTrash />
			</ActionIcon>
		</FormField>
	);
}
