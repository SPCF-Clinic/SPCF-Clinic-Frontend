import { Button, Group } from "@mantine/core";

import { useAuth } from "@/hooks/useAuth";

export default function AdminLogin() {
  const { loginMutation } = useAuth();

  const handleAdminLogin = () =>
    loginMutation.mutate({ username: "admin1", password: "admin" });

  const handleSuperAdminLogin = () =>
    loginMutation.mutate({ username: "superadmin", password: "superadmin" });

  const isAdminLogin =
    loginMutation.variables?.username === "admin" && loginMutation.isPending;

  const isSuperAdminLogin =
    loginMutation.variables?.username === "superadmin" &&
    loginMutation.isPending;

  return (
    <Group>
      <Button
        onClick={handleAdminLogin}
        loading={isAdminLogin}
        disabled={isAdminLogin}
      >
        Admin Login
      </Button>

      <Button
        onClick={handleSuperAdminLogin}
        loading={isSuperAdminLogin}
        disabled={isSuperAdminLogin}
      >
        Super Admin Login
      </Button>
    </Group>
  );
}
