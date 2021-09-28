import React from 'react'
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

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { AuthProvider} from './context'

const queryClient = new QueryClient()

const App = () => {

  return (
    <AuthProvider>
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
    </AuthProvider>
  )
}

export default App
