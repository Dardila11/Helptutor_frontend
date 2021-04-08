import React, {useEffect} from 'react'
import { ThemeProvider } from '@material-ui/core'
import GlobalStyles from './components/GlobalStyles'
import theme from './theme'

import Routing from './routing/composeRouter'

//ALERTS
import AlertComponent from './components/Alert'

import ProgressAction from './layouts/Progress/ProgressAction'

//REDUX
import { Provider } from 'react-redux'
import store from './redux/store'

import { loadUser } from './redux/actions/auth'

const App = () => {
  useEffect(() => {
    if(store.getState('auth').auth.isAuthenticated)store.dispatch(loadUser());    
  });

  return (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <ProgressAction />
          <AlertComponent />
          <Routing />
        </ThemeProvider>
    </Provider>
  )
}

export default App
