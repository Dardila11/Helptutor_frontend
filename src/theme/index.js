import { createMuiTheme, colors } from '@material-ui/core'
import shadows from './shadows'
import typography from './typography'

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      //dark: colors.common.white,
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      //main: colors.indigo[500]
      main: '#1190CB'
    },
    secondary: {
      main: '#8e9ea5'
    },
    text: {
      //primary: colors.blueGrey[900],
      primary: '#005579',
      secondary: colors.blueGrey[600]
    },
    button: {
      primary: '#005579'
    }
  },
  shadows,
  typography
})

export default theme
