import React, { useEffect } from 'react'
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
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'


const queryClient = new QueryClient()

const App = () => {
  useEffect(() => {
    if (store.getState('auth').auth.token != null) store.dispatch(loadUser())
  })

  return (
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ProgressAction />
        <AlertComponent />
        <Routing />
      </ThemeProvider>
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
