import { PasswordInput, Button, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { studentQueries } from '@/query/students';

interface ChangePasswordFormProps {
  studentId: number;
}

export default function ChangePasswordForm({ studentId }: ChangePasswordFormProps) {
  const queryClient = useQueryClient();

  const { mutate: updatePassword, isPending } = useMutation({
    ...studentQueries.updatePassword(studentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: studentQueries.detail(studentId).queryKey,
      });
      modals.closeAll();
    },
  });

  const form = useForm({
    initialValues: {
      password: '',
      confirm_password: '',
    },
    validate: {
      password: (value) =>
        value.length < 8 ? 'Password must be at least 6 characters' : null,
      confirm_password: (value, values) =>
        value !== values.password ? 'Passwords do not match' : null,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    updatePassword(values.password);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <PasswordInput
          label="Password"
          placeholder="password123"
          required
          radius="md"
          {...form.getInputProps('password')}
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="password123"
          required
          radius="md"
          {...form.getInputProps('confirm_password')}
        />

        <Button
          type="submit"
          fullWidth
          radius="xl"
          size="md"
          mt="xs"
          loading={isPending}
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
  );
}