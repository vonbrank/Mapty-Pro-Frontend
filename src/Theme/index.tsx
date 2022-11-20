import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  
  typography: {
    htmlFontSize: 10,
  },
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff",
    },
    secondary: {
      light: "#dc4633",
      main: "#D41800",
      dark: "#941000",
      contrastText: "#000",
    },
  },
});

export default theme;
