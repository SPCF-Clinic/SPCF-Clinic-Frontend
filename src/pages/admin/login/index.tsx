import { Box, Flex, Group, Image, SimpleGrid, Stack } from "@mantine/core";

import SPCF from "@/assets/image/SPCF.webp";
import spcfLogo from "@/assets/spcf-logo.webp";
import LoginForm from "./components/LoginForm";

export default function AdminLogin() {
	return (
		<SimpleGrid cols={{ base: 1, md: 2 }} mih="100svh" spacing={0}>
			<Stack gap="md" p={{ base: "md", md: "xl" }}>
				<Group pos="absolute">
					<Image src={spcfLogo} w={48} h={48} />
				</Group>
				<Flex flex={1} align="center" justify="center">
					<Box w="100%" maw="30rem">
						<LoginForm />
					</Box>
				</Flex>
			</Stack>
			<Box pos="relative" display={{ base: "none", md: "block" }}>
				<Image pos="absolute" inset={0} h="100%" w="100%" src={SPCF} />
				<Box
					pos="absolute"
					inset={0}
					style={{
						background:
							"linear-gradient(270deg, rgba(41, 79, 175, 0.8) 0%, rgba(41, 49, 91, 0.8) 100%)",
					}}
				/>
			</Box>
		</SimpleGrid>
	);
}
