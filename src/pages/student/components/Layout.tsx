import { Flex, Box } from "@mantine/core";


interface LayoutProps {
  children: React.ReactNode;
  onSubmit?: () => void;
  height?: string
}
export default function Layout({children,onSubmit, height }:LayoutProps){
    return (
       <Flex mih={"83vh"}  align={"flex-end"}>
          <Box h={height}
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