import {
  AppShell,
  NavLink,
  Stack,
  useMantineTheme,
  type NavLinkProps,
} from "@mantine/core";
import { NavLink as Link } from "react-router-dom";
import {
  IconLayoutGrid,
  IconPill,
  IconRotate2,
  IconSchool,
  IconSettings,
} from "@tabler/icons-react";
import { useMediaQuery, type UseHoverReturnValue } from "@mantine/hooks";

const URL_PREFIX = "/admin";

type TNavLink = NavLinkProps & React.ComponentProps<typeof Link>;

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
      <Stack gap="xs">
        {links.map(({ label, ...link }, i) => (
          <NavLink
            key={i}
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
        ))}
      </Stack>
    </AppShell.Navbar>
  );
}
