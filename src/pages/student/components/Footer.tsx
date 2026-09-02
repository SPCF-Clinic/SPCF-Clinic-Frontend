import { IconLock } from "@tabler/icons-react";
import { Flex, Text, Divider } from "@mantine/core";

export default function Footer(){
    return (
        <>
         <Divider />

          <Flex align={"center"} gap={10}>
            <IconLock color="#737373" size={15} />
            <Text fz={12} c={"#737373"}>
              Your information is kept confidential and used only for clinic
              records.
            </Text>
          </Flex>
        </>
    )
}