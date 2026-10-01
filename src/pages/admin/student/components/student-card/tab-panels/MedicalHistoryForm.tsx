import { useEffect, useMemo } from "react";
import { Button, Checkbox, Group, Radio, Select, SimpleGrid, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";

import { useMedicalInfo, useUpdateMedicalHistory } from "@/hooks/students/useRegisterStudent";
import { studentQueries } from "@/query/students";
import type { MedicalHistoryField } from "@/types/student-register";
import type { StudentShow } from "@/types/students";
import { toSelectOptions } from "@/utils/fieldOptions";

interface MedicalHistoryFormProps {
	studentData: StudentShow;
	onCancel?: () => void;
}

type FormValues = Record<string, string | string[]>;

function getInitialValue(studentData: StudentShow, field: MedicalHistoryField) {
	return studentData.medical_history.find((item) => item.id === field.id)?.value ?? "";
}

function FieldInput({ field, form }: { field: MedicalHistoryField; form: ReturnType<typeof useForm<FormValues>> }) {
	const name = `medical_history[${field.id}]`;
	const options = toSelectOptions(field);

	if (field.type.name === "Radio") {
		return <Radio.Group label={field.name} {...form.getInputProps(name)}><Group mt="xs">{options.map((option) => <Radio key={option.value} value={option.value} label={option.label} />)}</Group></Radio.Group>;
	}

	if (field.type.name === "Checkbox") {
		return <Checkbox.Group label={field.name} {...form.getInputProps(name)}><Group mt="xs">{options.map((option) => <Checkbox key={option.value} value={option.value} label={option.label} />)}</Group></Checkbox.Group>;
	}

	if (field.type.has_options) {
		return <Select label={field.name} data={options} searchable {...form.getInputProps(name)} />;
	}

	return <TextInput label={field.name} {...form.getInputProps(name)} />;
}

export default function MedicalHistoryForm({ studentData, onCancel }: MedicalHistoryFormProps) {
	const queryClient = useQueryClient();
	const { data: fieldsResponse, isPending: isFieldsPending } = useMedicalInfo();
	const { mutate: updateMedicalHistory, isPending: isUpdating } = useUpdateMedicalHistory(studentData.id);
	const fields = useMemo(
		() => (fieldsResponse?.data ?? []).filter((field) => field.type.name !== "Divider"),
		[fieldsResponse],
	);
	const initialValues = useMemo<FormValues>(() => Object.fromEntries(
		fields.map((field) => [`medical_history[${field.id}]`, getInitialValue(studentData, field)]),
	), [fields, studentData]);
	const form = useForm<FormValues>({ initialValues });

	useEffect(() => {
		form.setValues(initialValues);
	}, [initialValues]);

	const handleSubmit = (values: FormValues) => {
		const payload = {
			form_version: fieldsResponse?.form_version ?? "",
			...values,
		};

		updateMedicalHistory(payload, {
			onSuccess: async () => {
				await queryClient.refetchQueries({
					queryKey: studentQueries.detail(studentData.id).queryKey,
				});
				onCancel?.();
			},
		});
	};

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
				{fields.map((field) => <FieldInput key={field.id} field={field} form={form} />)}
			</SimpleGrid>
			<Group justify="flex-end" mt="xl">
				{onCancel && <Button type="button" variant="subtle" onClick={onCancel} disabled={isUpdating}>Cancel</Button>}
				<Button type="submit" loading={isUpdating} disabled={isFieldsPending}>Update</Button>
			</Group>
		</form>
	);
}