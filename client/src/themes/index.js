import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#181A1B", // light black
      main: "#0B0C0D", // dark black
    },
    secondary: {
      main: "#553E7F", // purple
    },
    text: {
      primary: "#ffffff", // white
      secondary: "#8776eb", // purple
    },
  },
});

export default theme;
