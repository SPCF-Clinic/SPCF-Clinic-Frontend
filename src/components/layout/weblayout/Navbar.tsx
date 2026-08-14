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

	const { loginMutation, logoutMutation } = useAuth();

	// Temporary
	const handleLogin = () => {
		loginMutation.mutate({ username: "superadmin", password:  "superadmin"  });
	};

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
					{links.map(({ label, ...link }) => (
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
					))}
				</Stack>
			</AppShell.Section>

			<AppShell.Section>
				<Stack gap="xs">
					<NavLink
						disabled={loginMutation.isPending}
						onClick={handleLogin}
						bdrs="xl"
						fz="lg"
						label="Log In"
						leftSection={
							loginMutation.isPending  ? (
								<Loader size="xs" />
							) : (
								<IconLayoutGrid />
							)
						}
						style={{ whiteSpace: "nowrap" }}
						fw={500}
					/>
					<NavLink
						disabled={logoutMutation.isPending}
						onClick={handleLogout}
						bdrs="xl"
						fz="lg"
						label="Log Out"
						leftSection={
							logoutMutation.isPending  ? (
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
