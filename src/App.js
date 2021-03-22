import React from 'react'
import { useRoutes } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import GlobalStyles from './components/GlobalStyles'
import routes from './routes'
import theme from './theme'

//ALERTS
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const alertOptions = {
  timeout: 3000,
  position: 'top center',
};

const App = () => {
  const routing = useRoutes(routes)
  return (
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {routing}
      </ThemeProvider>
    </AlertProvider>
  )
}

export default App
