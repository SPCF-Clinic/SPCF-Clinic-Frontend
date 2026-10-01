import { useEffect } from "react";
import {
  Box,
  Button,
  Text,
  Anchor,
  Breadcrumbs,
  Stack,
  Title,
  Loader,
  Center,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

import { useSpecificStudent } from "@/query/student-dashboard";
import { useMedicalInfo, usePersonalInfo } from "@/hooks/students/useRegisterStudent";
import { data_type } from "../utils/register-form/register.form";

import TextInput1 from "../components/TextInput";
import DateInput from "../components/DateInput";
import RadioInput from "../components/RadioInput";
import DropdownInput from "../components/DropdownInput";
import CheckboxInput from "../components/CheckboxInput";
import SectionDivider from "../components/Divider";
import Layout from "../components/Layout";
import Footer from "../components/Footer";

interface UpdateFormValues {
  personal_info: Record<number, string>;
  medical_history: Record<number, string | string[]>;
}

export default function Updatedetails() {
  const { student_number } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Explicit type check with fallback
  const rawType = searchParams.get("type");
  const type =
    rawType === "medical_history" ? "medical_history" : "personal_info";
  const isPersonal = type === "personal_info";

  const { data: studentData, isLoading } = useSpecificStudent(
    Number(student_number),
  );
  const { data: personalSchema } = usePersonalInfo();
  const { data: medicalSchema } = useMedicalInfo();

  const form = useForm<UpdateFormValues>({
    initialValues: {
      personal_info: {},
      medical_history: {},
    },
  });

  useEffect(() => {
    if (studentData?.data) {
      const personalMap: Record<number, string> = {};
      const mapPersonalFields = (fields: any[]) => {
        fields?.forEach((field: any) => {
          personalMap[field.id] = Array.isArray(field.value)
            ? field.value.join(", ")
            : (field.value ?? "");

          if (Array.isArray(field.additional_fields)) {
            mapPersonalFields(field.additional_fields);
          }
        });
      };
      mapPersonalFields(studentData.data.personal_info ?? []);

      const medicalMap: Record<number, string | string[]> = {};
      const mapMedicalFields = (fields: any[]) => {
        fields?.forEach((field: any) => {
          medicalMap[field.id] = field.value ?? "";

          if (Array.isArray(field.additional_fields)) {
            mapMedicalFields(field.additional_fields);
          }
        });
      };
      mapMedicalFields(studentData.data.medical_history ?? []);

      form.setValues({
        personal_info: personalMap,
        medical_history: medicalMap,
      });
    }
  }, [studentData]);

  const handleValueChange = (
    fieldId: number,
    value: string | string[] | null,
  ) => {
    const targetKey = isPersonal ? "personal_info" : "medical_history";
    form.setFieldValue(targetKey, {
      ...form.values[targetKey],
      [fieldId]: value ?? "",
    });
  };

  const renderField = (field: any) => {
    const activeKey = isPersonal ? "personal_info" : "medical_history";
    const fieldError = form.errors[`${activeKey}.${field.id}`] as
      | string
      | undefined;
    const currentValue =
      form.values[activeKey]?.[field.id] ?? field.value ?? "";
    const fallbackOptions = Array.isArray(currentValue)
      ? currentValue.filter((v): v is string => typeof v === "string")
      : typeof currentValue === "string" && currentValue.trim() !== ""
        ? [currentValue]
        : [];
    const fieldOptions =
      Array.isArray(field.options) && field.options.length > 0
        ? field.options
        : fallbackOptions;

    const rawTypeName =
      field.type?.name ?? (Array.isArray(field.value) ? "Checkbox" : "Text");
    const baseType = data_type(rawTypeName) || "Text";

    const isDropdown = baseType === "Dropdown";

    if (isDropdown) {
      return (
        <DropdownInput
          key={field.id}
          label={field.name}
          withAsterisk={field.is_required ?? false}
          error={fieldError}
          data={fieldOptions}
          value={currentValue as string}
          onChange={(val) => handleValueChange(field.id, val)}
        />
      );
    }

    switch (baseType) {
      case "Divider":
        return (
          <SectionDivider
            key={field.id}
            label={field.name}
            descriptionLabel={field.description_text ?? ""}
          />
        );

      case "Date":
        return (
          <DateInput
            key={field.id}
            label={field.name}
            withAsterisk={field.is_required ?? false}
            error={fieldError}
            value={currentValue as string}
            onChange={(val) => handleValueChange(field.id, val)}
          />
        );

      case "Radio":
        return (
          <RadioInput
            key={field.id}
            label={field.name}
            withAsterisk={field.is_required ?? false}
            error={fieldError}
            data={fieldOptions}
            value={currentValue as string}
            onChange={(val) => handleValueChange(field.id, val)}
          />
        );

      case "Checkbox":
        return (
          <CheckboxInput
            key={field.id}
            label={field.name}
            withAsterisk={field.is_required ?? false}
            error={fieldError}
            options={fieldOptions}
            data={
              Array.isArray(currentValue)
                ? currentValue
                : typeof currentValue === "string"
                  ? currentValue
                  : []
            }
            onChange={(vals) => handleValueChange(field.id, vals)}
          />
        );

      case "Text":
      default:
        return (
          <TextInput1
            key={field.id}
            label={field.name}
            withAsterisk={field.is_required ?? false}
            error={fieldError}
            value={currentValue as string}
            onChange={(val) => handleValueChange(field.id, val)}
          />
        );
    }
  };

  const handleSubmit = (values: UpdateFormValues) => {
    if (!student_number) {
      console.error("student_number is missing from URL params!");
      return;
    }

    const payload = isPersonal
      ? { personal_info: values.personal_info }
      : { medical_history: values.medical_history };

    navigate(
      `/student-dashboard/${student_number}/review-details?type=${type}`,
      {
        state: { formData: payload },
      },
    );
  };

  const personalSchemaFields = Array.isArray(
    (personalSchema as any)?.data?.data,
  )
    ? (personalSchema as any).data.data
    : Array.isArray((personalSchema as any)?.data)
      ? (personalSchema as any).data
      : [];

  const medicalSchemaFields = Array.isArray((medicalSchema as any)?.data?.data)
    ? (medicalSchema as any).data.data
    : Array.isArray((medicalSchema as any)?.data)
      ? (medicalSchema as any).data
      : [];

  const fieldsSchema = isPersonal
    ? personalSchemaFields.length > 0
      ? personalSchemaFields
      : studentData?.data?.personal_info || []
    : medicalSchemaFields.length > 0
      ? medicalSchemaFields
      : studentData?.data?.medical_history || [];

  const titleText = isPersonal
    ? "Personal Information"
    : "Medical & Vaccination History";

  const descriptionText = isPersonal
    ? "Please provide the student's basic personal details."
    : "Please provide the student's medical and vaccination history.";

  return (
    <Layout height="100%" onSubmit={form.onSubmit(handleSubmit)}>
      <Box>
        <Breadcrumbs separator=">" mb="xs">
          <Anchor onClick={() => navigate(-1)} size="xs" c="dimmed">
            Home
          </Anchor>
          <Text size="xs" c="dimmed" fw={500}>
            {titleText}
          </Text>
        </Breadcrumbs>

        <Box mb="md">
          <Title order={2} fw={800} fz={28}>
            {titleText}
          </Title>
          <Text size="sm" c="dimmed" mt={4}>
            {descriptionText}
          </Text>
        </Box>
        {isLoading && (
          <Center>
            <Loader />
          </Center>
        )}
        <Stack gap="md">
          {fieldsSchema.map((item: any) => {
            const activeKey = isPersonal ? "personal_info" : "medical_history";
            const parentValue = form.values[activeKey]?.[item.id];

            const activeAdditionalFields = item.additional_fields?.filter(
              (subField: any) => {
                if (!subField.required_with_field_value) {
                  return true;
                }

                if (Array.isArray(parentValue)) {
                  return parentValue.includes(
                    subField.required_with_field_value,
                  );
                }

                return subField.required_with_field_value === parentValue;
              },
            );

            return (
              <Stack key={item.id} gap="md">
                {renderField(item)}

                {activeAdditionalFields &&
                  activeAdditionalFields.length > 0 && (
                    <Stack gap="md" pl="md">
                      {!isPersonal &&
                        activeAdditionalFields.some(
                          (sf: any) => sf.name === "Vaccine Name",
                        ) && (
                          <SectionDivider descriptionLabel="If you are uncertain about the exact date, please just indicate the year it was administered." />
                        )}
                      {activeAdditionalFields.map((subField: any) =>
                        renderField(subField),
                      )}
                    </Stack>
                  )}
              </Stack>
            );
          })}
        </Stack>

        <Box mt={30}>
          <Button
            type="submit"
            size="lg"
            radius="xl"
            fullWidth
            h={50}
            bg="#294FAF"
            styles={{
              root: {
                fontWeight: 600,
                fontSize: "16px",
              },
            }}
          >
            Continue
          </Button>
          <Box mt="md">
            <Footer />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
