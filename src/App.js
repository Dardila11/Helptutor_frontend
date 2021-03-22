import React from 'react'
import { useRoutes } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import GlobalStyles from './components/GlobalStyles'
import routes from './routes'
import theme from './theme'

//ALERTS
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import Alerts from './layouts/Alert/Alerts';

//REDUX
import { Provider } from 'react-redux'
import store from './redux/store'

const alertOptions = {
  timeout: 3000,
  position: 'top center'
}

const App = () => {
  const routing = useRoutes(routes)
  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Alerts />
          {routing}
        </ThemeProvider>
      </AlertProvider>
    </Provider>
  )
}

export default App
