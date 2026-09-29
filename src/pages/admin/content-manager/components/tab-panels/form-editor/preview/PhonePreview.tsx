import { BackgroundImage, Box, Flex, Image } from "@mantine/core";

import MOB_bg from "@/assets/image/MOB_bg.png";
import SPCF_1 from "@/assets/image/SPCF_1.png";
import classes from "./PhonePreview.module.css";

/**
 * The form card's constants, copied from the student page's
 * `components/Layout.tsx`.
 */
const CARD_BACKGROUND = "#EDF0F6";
const CARD_TOP_RADIUS = "40px 40px 0px 0px";
const CARD_PADDING = "40px";

interface PhonePreviewProps {
	children: React.ReactNode;
}

export default function PhonePreview({ children }: PhonePreviewProps) {
	return (
		<Box className={classes.frame}>
			<Box className={classes.screen}>
				<BackgroundImage h="100%" src={MOB_bg}>
					<Flex direction="column" h="100%">
						<Flex
							justify="center"
							align="center"
							pt="md"
							style={{ flexShrink: 0 }}
						>
							<Image src={SPCF_1} h="100px" w="80px" fit="contain" mb={40} />
						</Flex>

						<Box
							bg={CARD_BACKGROUND}
							bdrs={CARD_TOP_RADIUS}
							p={CARD_PADDING}
							className={classes.card}
						>
							{children}
						</Box>
					</Flex>
				</BackgroundImage>
			</Box>
		</Box>
	);
}
