import { useEffect, useMemo } from "react";
import {
	Button,
	Checkbox,
	Group,
	Radio,
	Select,
	SimpleGrid,
	TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";

import { usePersonalInfo, useUpdatePersonalInfo } from "@/hooks/students/useRegisterStudent";
import { studentQueries } from "@/query/students";
import type { PersonalInfoField } from "@/types/student-register";
import type { StudentShow } from "@/types/students";
import { toSelectOptions } from "@/utils/fieldOptions";

interface StudentPersonalInfoFormProps {
	studentData: StudentShow;
	onCancel?: () => void;
}

type FormValues = Record<string, string | string[]>;

function getInitialValue(value: string | string[]) {
	return Array.isArray(value) ? value : value ?? "";
}

function getFieldValue(studentData: StudentShow, field: PersonalInfoField) {
	return studentData.personal_info.find((item) => item.id === field.id)?.value ?? "";
}

function FieldInput({ field, form }: { field: PersonalInfoField; form: ReturnType<typeof useForm<FormValues>> }) {
	const name = `personal_info[${field.id}]`;
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

export default function StudentPersonalInfoForm({ studentData, onCancel }: StudentPersonalInfoFormProps) {
	const queryClient = useQueryClient();
	const { data: fieldsResponse, isPending: isFieldsPending } = usePersonalInfo();
	const { mutate: updatePersonalInfo, isPending: isUpdating } = useUpdatePersonalInfo(studentData.id);
	const fields = useMemo(
		() => (fieldsResponse?.data ?? []).filter((field) => field.type.name !== "Divider"),
		[fieldsResponse],
	);
	const initialValues = useMemo<FormValues>(() => Object.fromEntries(
		fields.map((field) => [`personal_info[${field.id}]`, getInitialValue(getFieldValue(studentData, field))]),
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

		updatePersonalInfo(payload, {
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
				<Button type="submit" loading={isUpdating} disabled={isFieldsPending}>
					Update
				</Button>
			</Group>
		</form>
	);
}