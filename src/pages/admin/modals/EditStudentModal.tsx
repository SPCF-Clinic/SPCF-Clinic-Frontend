import { modals } from '@mantine/modals';
import { Text, PasswordInput, Button, Stack } from '@mantine/core';

import type { StudentShow } from "@/types/students";
import EditStudentModalForm from "./contents/EditStudentModalForm";

const Edit = (studentData: StudentShow) => {
	modals.open({
		modalId: `edit-student-${studentData.id}`,
		centered: true,
		size: "xl",
		title: <Text fw={700}>Edit personal information</Text>,
		children: <EditStudentModalForm studentData={studentData} />,
	});
};



export const ChangePassword = (studentData: StudentShow) => {
  return modals.open({
    centered: true,
    radius: 'lg',
    size: 'sm',
    padding: 'lg',
    title: (
      <div>
        <Text fw={700} size="xl" lh={1.2}>
          Change Password
        </Text>
        <Text size="sm" c="dimmed">
          {studentData.name}
        </Text>
      </div>
    ),
    styles: {
      header: {
        borderBottom: '1px solid #e0e0e0',
        paddingBottom: '12px',
        marginBottom: '16px',
      },
    },
    children: (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // Handle password submit logic here
        }}
      >
        <Stack gap="md">
          <PasswordInput
            label="Password"
            placeholder="password123"
            required
            radius="md"
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="password123"
            required
            radius="md"
          />

          <Button
            type="submit"
            fullWidth
            radius="xl"
            size="md"
            mt="xs"
            styles={{
              root: {
                backgroundColor: '#2F4899',
                '&:hover': {
                  backgroundColor: '#223675',
                },
              },
            }}
          >
            Confirm
          </Button>
        </Stack>
      </form>
    ),
  });
};

const EditStudentModal = { Edit, ChangePassword };

export default EditStudentModal;