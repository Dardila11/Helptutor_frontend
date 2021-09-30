import React from 'react'

// ROUTER
import Routing from './routing/composeRouter'

// UTILITY
import AlertComponent from './components/Alert'
import ProgressAction from './layouts/Progress/ProgressAction'

// QUERY
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

// CONTEXT
import { AuthProvider } from './context'

//REDUX
import { Provider } from 'react-redux'
import store from './redux/store'

// STYLES
import { ThemeProvider } from '@material-ui/core'
import GlobalStyles from './components/GlobalStyles'
import theme from './theme'

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
          <ReactQueryDevtools initialIsOpen={false} />
        </Provider>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
