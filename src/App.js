import React, {useEffect} from 'react'
import { ThemeProvider } from '@material-ui/core'
import GlobalStyles from './components/GlobalStyles'
import theme from './theme'

import Routing from './routing/composeRouter'

//ALERTS
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import Alerts from './layouts/Alert/Alerts';

import ProgressAction from './layouts/Progress/ProgressAction'

//REDUX
import { Provider } from 'react-redux'
import store from './redux/store'

import { loadUser } from './redux/actions/auth'

const alertOptions = {
  timeout: 3000,
  position: 'top center'
}

const App = () => {
  useEffect(() => {
    console.log('cargando');
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <ProgressAction />
          <Alerts />
          <Routing />
        </ThemeProvider>
      </AlertProvider>
    </Provider>
  )
}

export default App
