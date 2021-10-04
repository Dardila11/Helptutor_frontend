import { createMuiTheme, colors } from '@material-ui/core'
import shadows from './shadows'
import typography from './typography'

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: '#1190CB'
    },
    secondary: {
      main: '#8e9ea5'
    },
    prices: {
      main: '#00e676'
    },
    text: {
      primary: '#005579',
      secondary: colors.blueGrey[600]
    },
    button: {
      primary: '#005579'
    }
  },
  textTruncate: {
    fontWeight: 500,
    fontSize: 14,
    letterSpacing: '-0.05px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },
  shadows,
  typography
})

export default theme
