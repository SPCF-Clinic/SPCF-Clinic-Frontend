import {
	Box,
	Button,
	Group,
	type ModalRootProps,
	NumberInput,
	Stack,
	Text,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect } from "react";

import { AppModal } from "@/components/AppModal";
import { toast } from "@/components/toast";
import { useDispenseItemMutation } from "@/hooks/items/useDispenseItemMutation";
import classes from "@/styles/Form.module.css";
import type { ItemIndex, ItemType } from "@/types/items";
import { showToastError } from "@/utils/toastError";

interface DispenseItemModalProps extends ModalRootProps {
	item: ItemIndex | null;
}

export default function DispenseItemModal({
	item,
	...props
}: DispenseItemModalProps) {
	const dispenseItemMutation = useDispenseItemMutation(item?.type as ItemType);

	const form = useForm<{ quantity: number | undefined }>({
		mode: "uncontrolled",
		validate: {
			quantity: (value) => {
				if (!value) return isNotEmpty("Quantity is required")(value);
				if (value > (item?.quantity ?? 0))
					return "Quantity cannot exceed total stock remaining";
				if (value <= 0) return "Quantity must be greater than 0";
			},
		},
	});

	useEffect(() => {
		if (!props.opened) return;

		form.setInitialValues({ quantity: undefined });
		form.reset();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.reset, form.setInitialValues, props.opened]);

	const handleSubmit = form.onSubmit(({ quantity }) => {
		if (!item || !quantity) return;

		dispenseItemMutation.mutate(
			{
				item_id: item.id,
				quantity_dispensed: quantity,
			},
			{
				onSuccess: () => {
					toast.success({ message: `${item.type} dispensed successfully` });
					props.onClose();
				},
				onError: (error) =>
					showToastError(error, `Failed to dispense ${item.type}`),
			},
		);
	});

	return (
		<AppModal
			title={`Dispense ${item?.type ?? "Item"}`}
			bodyProps={{ py: "md", px: "lg" }}
			{...props}
		>
			<form onSubmit={handleSubmit}>
				<Stack>
					<Box bg="#EDF0F6" bdrs="xs" px="md" py="xs">
						<Text c="primary" fw={600}>
							{item?.name}
						</Text>
						<Text size="sm">{item?.category}</Text>
					</Box>

					<DetailRow label="Total Stock">
						{item?.quantity} {item?.unit}
					</DetailRow>

					{item?.unit === "Boxes" && (
						<>
							<DetailRow label="Quantity per box">
								{item.item_content.quantity_per_item_unit}{" "}
								{item.item_content.content_unit}
							</DetailRow>

							{item.item_content.content_unit === "Bottles" && (
								<DetailRow label="Volume per bottle">
									{item.item_content.item_content.quantity_per_item_unit}
									{item.item_content.item_content.content_unit}
								</DetailRow>
							)}
						</>
					)}

					{item?.unit === "Bottles" && (
						<DetailRow label="Volume per bottle">
							{item.item_content.quantity_per_item_unit}
							{item.item_content.content_unit}
						</DetailRow>
					)}

					<NumberInput
						label="Quantity"
						allowDecimal={false}
						allowNegative={false}
						hideControls
						min={0}
						size="md"
						radius="sm"
						labelProps={{ fw: 500, fz: "sm" }}
						classNames={{ input: classes.input }}
						placeholder={"e.g. 8"}
						key={form.key("quantity")}
						{...form.getInputProps("quantity")}
					/>

					<Button
						type="submit"
						fullWidth
						size="md"
						radius="xl"
						loading={dispenseItemMutation.isPending}
					>
						Confirm
					</Button>
				</Stack>
			</form>
		</AppModal>
	);
}

function DetailRow({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<Group justify="space-between">
			<Text size="sm" c="gray.8">
				{label}
			</Text>
			<Text size="sm" tt="lowercase" fw={500}>
				{children}
			</Text>
		</Group>
	);
}
