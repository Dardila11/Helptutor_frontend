import React, { useReducer } from 'react'
import { AuthReducer, initialState } from './reducer'

const AuthStateContext = React.createContext()
const AuthDispatchContext = React.createContext()

export const useAuthState = () => {
  const context = React.useContext(AuthStateContext)
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider')
  }

  return context
}

export function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext)
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider')
  }
  console.log(context)

  return context
}

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState)

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  )
}
