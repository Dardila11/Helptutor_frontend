import React from 'react'

// components
import AlertComponent from './components/Alert'
import ProgressAction from './layouts/Progress/ProgressAction'

// context
import { AuthProvider } from './context'

// react-query
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

// redux
import { Provider } from 'react-redux'
import store from './redux/store'

// routing
import Routing from './routing/composeRouter'

// styles
import theme from './theme'
import GlobalStyles from './components/GlobalStyles'
import { ThemeProvider } from '@material-ui/core'

// css
import './App.css'
import 'react-toastify/dist/ReactToastify.min.css';

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
