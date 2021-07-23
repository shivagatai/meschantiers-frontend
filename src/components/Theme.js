import { createTheme } from "@material-ui/core/styles"

const marron = "#66290e"
const teintecomplementaire = "#c6afa5"
const forest = "#0B6623"

const theme = createTheme({
  palette: {
    common: {
      blue: `${marron}`,
      orange: `${teintecomplementaire}`,
      forest: `${forest}`,
    },
    primary: {
      light: "#9c786c",
      main: "#6d4c41",
      dark: "#40241a",
      contrastText: "#fff",
    },
    secondary: {
      light: "#e6ffff",
      main: "#b3e5fc",
      dark: "#82b3c9",
      contrastText: "#000",
    },
  },
  typography: {
    tab: {
      fontFamily: "Raleway",
      textTransform: "none",
      fontWeight: 700,
      fontSize: "1rem",
    },
    estimate: {
      fontFamily: "Pacifico",
      fontSize: "1rem",
      textTransform: "none",
      color: "white",
    },
  },
})

export default theme
