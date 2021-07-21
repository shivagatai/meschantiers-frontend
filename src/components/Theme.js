import { createTheme } from "@material-ui/core/styles"

const marron = "#66290e"
const teintecomplementaire = "#c6afa5"

const theme = createTheme({
  palette: {
    common: {
      blue: `${marron}`,
      orange: `${teintecomplementaire}`,
    },
    primary: {
      main: `${marron}`,
    },
    secondary: {
      main: `${teintecomplementaire}`,
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
