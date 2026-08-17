import {
  AppShell,
  Loader,
  NavLink,
  type NavLinkProps,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import { type UseHoverReturnValue, useMediaQuery } from "@mantine/hooks";
import {
  IconLayoutGrid,
  IconPill,
  IconRotate2,
  IconSchool,
  IconSettings,
} from "@tabler/icons-react";
import { NavLink as Link } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/stores/useAuthStore";

const URL_PREFIX = "/admin";

type TNavLink = NavLinkProps &
  React.ComponentProps<typeof Link> & {
    superAdminOnly?: boolean;
  };

const links: TNavLink[] = [
  {
    label: "Dashboard",
    to: "",
    end: true,
    leftSection: <IconLayoutGrid />,
  },
  {
    label: "List of Students",
    to: "/students",
    leftSection: <IconSchool />,
  },
  {
    label: "Medicines",
    to: "/medicines",
    leftSection: <IconPill />,
  },
  {
    label: "Records",
    to: "/records",
    leftSection: <IconRotate2 />,
  },
  {
    label: "Content Manager",
    to: "/content-manager",
    leftSection: <IconSettings />,
    superAdminOnly: true,
  },
];

interface NavbarProps {
  ref: UseHoverReturnValue["ref"];
}

export default function Navbar({ ref }: NavbarProps) {
  const theme = useMantineTheme();
  const isAboveBreakpoint = useMediaQuery(
    `(min-width: ${theme.breakpoints.sm})`,
  );

  const { logoutMutation } = useAuth();
  const role = useAuthStore((state) => state.user)?.role;
  const isSuperAdmin = role === "Super Admin";

  const filteredLinks = links.filter(
    (link) => !link.superAdminOnly || isSuperAdmin,
  );

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <AppShell.Navbar
      ref={ref}
      p="md"
      style={{
        transition: isAboveBreakpoint
          ? "width var(--mantine-layout-transition-duration) var(--mantine-layout-transition-timing)"
          : undefined,
      }}
    >
      <AppShell.Section grow>
        <Stack gap="xs">
          {filteredLinks.map((item) => {
            const { label, ...link } = item;
            delete link.superAdminOnly;

            return (
              <NavLink
                key={label as string}
                {...link}
                component={Link}
                to={`${URL_PREFIX}${link.to}`}
                variant="filled"
                bdrs="xl"
                fz="lg"
                label={label}
                style={{ whiteSpace: "nowrap" }}
                fw={500}
              />
            );
          })}
        </Stack>
      </AppShell.Section>

      <AppShell.Section>
        <Stack gap="xs">
          <NavLink
            disabled={logoutMutation.isPending}
            onClick={handleLogout}
            bdrs="xl"
            fz="lg"
            label="Log Out"
            leftSection={
              logoutMutation.isPending ? (
                <Loader size="xs" />
              ) : (
                <IconLayoutGrid />
              )
            }
            style={{ whiteSpace: "nowrap" }}
            fw={500}
          />
        </Stack>
      </AppShell.Section>
    </AppShell.Navbar>
  );
}
