import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#181A1B", // light black
      main: "#0B0C0D", // dark black
    },
    secondary: {
      main: "#4d4b9b", // purple
    },
    text: {
      primary: "#ffffff", // white
      secondary: "#8776eb", // purple
    },
  },
  typography: {
    h2: {
      fontWeight: 900,
      color: "#c9c9c9",
    },
    h4: {
      fontSize: "1.2rem",
      fontWeight: 900,
      "@media (min-width: 600px)": {
        fontSize: "2rem",
      },
    },
    h5: {
      fontWeight: 900,
    },
  },
});

export default theme;
