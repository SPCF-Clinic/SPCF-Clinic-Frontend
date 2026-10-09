import { modals } from "@mantine/modals";
import { Text } from "@mantine/core";

import ChangePasswordForm from "./forms/ChangePasswordForm";

const ChangePassword = (user: {
  id: number;
  name: string | null;
  username: string;
}) =>
  modals.open({
    centered: true,
    radius: "lg",
    size: "sm",
    padding: "lg",
    title: (
      <div>
        <Text fw={700} size="xl" lh={1.2}>
          Change Password
        </Text>
        <Text size="sm" c="dimmed">
          {user.name ?? user.username}
        </Text>
      </div>
    ),
    styles: {
      header: {
        borderBottom: "1px solid #e0e0e0",
        paddingBottom: "12px",
        marginBottom: "16px",
      },
    },
    children: <ChangePasswordForm userId={user.id} />,
  });

const AccountModal = { ChangePassword };

export default AccountModal;
