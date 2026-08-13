import {
  createTheme,
  DEFAULT_THEME,
  type CSSVariablesResolver,
  type MantineColorsTuple,
} from "@mantine/core";

const primary: MantineColorsTuple = [
  "#f0f2fa",
  "#dde1ee",
  "#b7bfdf",
  "#8e9cd1",
  "#6c7ec5",
  "#576bbe",
  "#4b62bc",
  "#3d52a6",
  "#354895",
  "#2d438e",
];

export const theme = createTheme({
  colors: {
    primary,
  },
  primaryColor: "primary",
  primaryShade: 9,
  fontFamily: `Inter, ${DEFAULT_THEME.fontFamily}`,
});

export const resolver: CSSVariablesResolver = () => ({
  variables: {
    "--mantine-layout-transition-duration": "300ms",
    "--mantine-layout-transition-timing": "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  light: {},
  dark: {},
});
