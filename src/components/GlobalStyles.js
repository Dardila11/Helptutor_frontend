import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    '@global': {
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0
      },
      html: {
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        overflowX: 'hidden'
      },
      body: {
        backgroundColor: '#F4F6F8',
        paddingRight: '0 !important',
        height: '100%',
        width: '100%'
      },
      a: {
        textDecoration: 'none'
      },
      '#root': {
        height: '100%',
        width: '100%'
      }
    }
  })
)

const GlobalStyles = () => {
  useStyles()
  return null
}

export default GlobalStyles
