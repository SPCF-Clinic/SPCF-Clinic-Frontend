import {
	Button,
	Collapse,
	type ModalRootProps,
	NumberInput,
	type NumberInputProps,
	Select,
	type SelectProps,
	Stack,
	TextInput,
	type TextInputProps,
} from "@mantine/core";
import { IconCaretDownFilled } from "@tabler/icons-react";

import { AppModal } from "@/components/AppModal";
import { toast } from "@/components/toast";
import {
	EMPTY_ITEM_CONTENT,
	ITEM_CATEGORIES,
	ITEM_UNITS,
} from "@/constants/items";
import { useCreateItemMutation } from "@/hooks/items/useCreateItemMutation";
import { useEditItemMutation } from "@/hooks/items/useEditItemMutation";
import type { ItemIndex, ItemType, ItemUnit } from "@/types/items";
import { isApiError } from "@/utils/api";
import BottleFields from "./BottleFields";
import BoxFields from "./BoxFields";
import classes from "./ItemFormModal.module.css";
import {
	ItemFormProvider,
	type ItemFormValues,
	itemFormTransformValues,
	itemFormValidate,
	useItemForm,
} from "./itemFormContext";
import QuantityField from "./QuantityField";

type ItemFormModalProps = ModalRootProps &
	(
		| { item: ItemIndex; itemType?: never }
		| { item?: never; itemType: ItemType }
	);

export default function ItemFormModal({
	item,
	itemType,
	onClose,
	...props
}: ItemFormModalProps) {
	const computedItemType = (item?.type ?? itemType) as ItemType;
	const isEditing = !!item;
	const createItemMutation = useCreateItemMutation(computedItemType);
	const editItemMutation = useEditItemMutation(computedItemType);

	const form = useItemForm({
		mode: "uncontrolled",
		initialValues: {
			name: item?.name,
			type: computedItemType,
			category: item?.category,
			unit: item?.unit,
			quantity: item?.quantity,
			item_content: item?.item_content ?? EMPTY_ITEM_CONTENT,
		},
		transformValues: (values) => itemFormTransformValues(values),
		validate: itemFormValidate(computedItemType),
	});

	const unit = form.useWatchValue("unit");

	const handleUnitChange = (value: string | null) => {
		form.setValues({
			unit: value as ItemUnit<ItemType>,
			quantity: undefined,
			item_content: EMPTY_ITEM_CONTENT,
		});
		form.clearFieldError("item_content.content_unit");
		form.clearFieldError("item_content.quantity_per_item_unit");
	};

	const renderUnitFields = () => {
		switch (unit) {
			case "Boxes":
				return <BoxFields itemType={computedItemType} />;
			case "Bottles":
				return <BottleFields />;
			default:
				return <QuantityField />;
		}
	};

	const handleSubmit = (values: ItemFormValues) => {
		const onError = (error: Error) => {
			const message = `Failed to ${isEditing ? "edit" : "create"} ${computedItemType}`;
			if (isApiError(error)) {
				return toast.error({
					message: error.response?.data.message ?? message,
				});
			}
			return toast.error({ message });
		};

		if (isEditing) {
			editItemMutation.mutate(
				{ itemId: item.id, data: values },
				{
					onSuccess: () => {
						toast.success({
							message: `${computedItemType} edited successfully`,
						});
						form.reset();
						onClose?.();
					},
					onError,
				},
			);
		} else {
			createItemMutation.mutate(values, {
				onSuccess: () => {
					toast.success({
						message: `${computedItemType} created successfully`,
					});
					form.reset();
					onClose?.();
				},
				onError,
			});
		}
	};

	return (
		<AppModal
			title={
				isEditing ? `Edit ${computedItemType}` : `Add New ${computedItemType}`
			}
			onClose={() => {
				form.reset();
				onClose?.();
			}}
			bodyProps={{ py: "md", px: "lg" }}
			{...props}
		>
			<ItemFormProvider form={form}>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<Stack>
						<TextField
							data-autofocus
							label={`${computedItemType} Name`}
							placeholder={`e.g. ${
								computedItemType === "Medicine" ? "Biogesic" : "Cotton Balls"
							}`}
							key={form.key("name")}
							{...form.getInputProps("name")}
						/>

						<SelectField
							label="Category"
							data={ITEM_CATEGORIES[computedItemType]}
							key={form.key("category")}
							{...form.getInputProps("category")}
						/>

						<SelectField
							label="Unit"
							data={ITEM_UNITS[computedItemType]}
							key={form.key("unit")}
							{...form.getInputProps("unit")}
							onChange={handleUnitChange}
						/>

						<Collapse expanded={Boolean(unit)}>
							<Stack bg="#EDF0F6" p="md" pt="xs" bdrs="sm">
								{renderUnitFields()}
							</Stack>
						</Collapse>

						<Button
							type="submit"
							fullWidth
							size="md"
							radius="xl"
							loading={
								isEditing
									? editItemMutation.isPending
									: createItemMutation.isPending
							}
						>
							Confirm
						</Button>
					</Stack>
				</form>
			</ItemFormProvider>
		</AppModal>
	);
}

export function TextField(props: TextInputProps) {
	return (
		<TextInput
			size="md"
			radius="sm"
			labelProps={{ fw: 500, fz: "sm" }}
			classNames={{ input: classes.input }}
			{...props}
		/>
	);
}

export function SelectField(props: SelectProps) {
	return (
		<Select
			size="md"
			radius="sm"
			labelProps={{ fw: 500, fz: "sm" }}
			searchable
			rightSection={<IconCaretDownFilled size={14} color="black" />}
			withAlignedLabels
			classNames={{
				input: classes.input,
				option: classes.option,
			}}
			{...props}
		/>
	);
}

export function NumberField(props: NumberInputProps) {
	return (
		<NumberInput
			allowDecimal={false}
			allowNegative={false}
			hideControls
			min={0}
			size="md"
			radius="sm"
			labelProps={{ fw: 500, fz: "sm" }}
			classNames={{ input: classes.input }}
			{...props}
		/>
	);
}
