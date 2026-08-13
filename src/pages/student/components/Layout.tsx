import { Flex, Box } from "@mantine/core";


interface LayoutProps {
  children: React.ReactNode;
  onSubmit?: () => void
}
export default function Layout({children,onSubmit }:LayoutProps){
    return (
       <Flex mih={"91.1vh"} align={"flex-end"}>
          <Box
            component="form"
            onSubmit={onSubmit}
            w={"100vw"}
            bg={"#EDF0F6"}
            bdrs={"40px 40px 0px 0px"}
            p={"40px"}
          >
            {children}
          </Box>
        </Flex>
    )
}