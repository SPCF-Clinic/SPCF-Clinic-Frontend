import {
	AppShell,
	Box,
	Burger,
	Group,
	Image,
	Stack,
	Text,
	TextInput,
} from "@mantine/core";
import type { UseHoverReturnValue } from "@mantine/hooks";
import { createSerializer, parseAsString } from "nuqs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import spcfLogo from "@/assets/spcf-logo.webp";
import { NAVBAR_CLOSED_WIDTH, NAVBAR_OPENED_WIDTH } from "../WebLayout";
import classes from "./Header.module.css";

interface HeaderProps {
	mobile: { opened: boolean; toggle: () => void };
	desktop: { opened: boolean };
	ref: UseHoverReturnValue["ref"];
}

export default function Header({
	mobile: { opened: mobileOpened, toggle: toggleMobile },
	desktop: { opened: desktopOpened },
	ref,
}: HeaderProps) {
	const navWidth = desktopOpened ? NAVBAR_OPENED_WIDTH : NAVBAR_CLOSED_WIDTH;

	const navigate = useNavigate();
	const [studentNumber, setStudentNumber] = useState("");
	const serialize = createSerializer({
		student_id: parseAsString,
	});

	const handleSearch = (value: string) => {
		if (!studentNumber) return;

		navigate(`/admin/students${serialize({ student_id: value })}`);
	};

	return (
		<AppShell.Header pt="md" pb="sm">
			<Group h="100%" px="md" gap="0" wrap="nowrap">
				<Box ref={ref} className={classes.logoHitArea}>
					<Group
						gap={4}
						wrap="nowrap"
						ref={ref}
						className={classes.logoRail}
						style={{ "--nav-w": `${navWidth}px` } as React.CSSProperties}
						data-opened={desktopOpened}
					>
						<Image src={spcfLogo} w={48} />
						<Stack
							align="flex-start"
							gap={0}
							className={classes.logoText}
							data-opened={desktopOpened}
						/>
					</Group>
				</Box>

				<Group flex={1} justify="space-between" pe="xl">
					<Box>
						<Text fw={600} component="h1" fz="28" lh="1">
							Dashboard
						</Text>
						<Text fw={300}>School Clinic and Health Service</Text>
					</Box>
					<Box visibleFrom="sm">
						<TextInput
							variant="filled"
							size="md"
							radius="xl"
							miw={350}
							placeholder="Search Student Number"
							inputMode="numeric"
							value={studentNumber}
							onChange={(event) => {
								setStudentNumber(event.currentTarget.value.replace(/\D/g, ""));
							}}
							onKeyDown={(event) => {
								if (event.key === "Enter") {
									handleSearch(event.currentTarget.value);
								}
							}}
						/>
					</Box>
				</Group>
				<Burger
					opened={mobileOpened}
					onClick={toggleMobile}
					hiddenFrom="sm"
					size="sm"
				/>
				{/* <Burger
          opened={desktopOpened}
          onClick={toggleDesktop}
          visibleFrom="sm"
          size="sm"
        /> */}
			</Group>
		</AppShell.Header>
	);
}
