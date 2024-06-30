import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    primary: {
      light: "#111827",
      main: "#000000",
      dark: "#030712",
    },
    secondary: {
      light: "#9ca3af",
      main: "#6b7280",
      dark: "#4b5563",
    },
    // error: {},
    // warning: {},
    // success: {
    //   light: "#DCFFA0",
    //   main: "#a3e635",
    //   dark: "#65a30d",
    // },
  },
  components: {
    // MuiCssBaseline: {
    //   styleOverrides: `
    //     h1 {
    //       color: grey;
    //     }
    //   `,
    // },
    // set container max width 1200
    MuiContainer: {
      defaultProps: { maxWidth: "lg" },
    },
    // set button contained by default
    MuiButton: {
      defaultProps: { variant: "contained" },
    },
  },
});
