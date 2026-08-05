import { Outlet } from "react-router-dom";
import { AppShell } from "@mantine/core";


export default function Main() {




  return (
    <AppShell.Main
      style={{
        minHeight: "100vh",

        backgroundColor: "#ffffff",

        backgroundSize: "60px 64px",

        backgroundRepeat: "repeat",
      }}
    >
      <Outlet />
    </AppShell.Main>
  );
}