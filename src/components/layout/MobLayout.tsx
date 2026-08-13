import { Image, Flex, BackgroundImage } from "@mantine/core";
import { Outlet } from "react-router-dom";

import MOB_bg from "../../assets/image/MOB_bg.png";
import SPCF_1 from "../../assets/image/SPCF_1.png";

export default function MobLayout() {
  return (
    <BackgroundImage h="100vh" w="100vw" src={MOB_bg} >
      
       <Flex direction="column" h="100%" w="100%">
        <Flex justify="center" align="center" pt="md" style={{ flexShrink: 0 }}>
          <Image src={SPCF_1} h="100px" w="80px" fit="contain" mb={40}/>
        </Flex>

        <Flex direction="column" flex={1} >
          <Outlet />
        </Flex>
      </Flex>
    </BackgroundImage>
  );
}
