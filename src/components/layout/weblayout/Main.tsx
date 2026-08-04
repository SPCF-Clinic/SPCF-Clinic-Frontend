import { Outlet } from "react-router-dom";
import { AppShell } from "@mantine/core";

import { useTheme } from "../../../context/ThemeContext";

export default function Main() {
  const {colors } = useTheme();



  return (
    <AppShell.Main
      style={{
        minHeight: "100vh",

        backgroundColor: colors.bgBase,

        backgroundSize: "60px 64px",

        backgroundRepeat: "repeat",
      }}
    >
      <Outlet />
    </AppShell.Main>
  );
}