import React, { useEffect } from 'react'
import { Route, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const PrivateRoute = ({ auth, children, ...rest }) => {
  const navigate = useNavigate()
  
  useEffect(()=>{
    if(!auth.isAuthenticated) navigate('/login')
  })

  if (auth.isLoading) {
    return <h2>Loading...</h2>
  } 
  return (
    <Route {...rest} />
  )
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)
