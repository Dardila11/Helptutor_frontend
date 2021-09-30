import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthState } from 'src/context/context'

const PrivateRoute = ({ element }) => {
  const { isAuthenticated, isLoading } = useAuthState()

  return isAuthenticated && !isLoading ? element : <Navigate to="/login" />
}

export default PrivateRoute
