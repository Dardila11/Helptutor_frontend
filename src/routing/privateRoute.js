import React, { useEffect } from 'react'
import { Route, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Backdrop,
  Box,
  CircularProgress,
  makeStyles,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.common.white
  }
}))

const PrivateRoute = ({ auth, children, ...rest }) => {
  const classes = useStyles()
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/login')
  })

  return auth.isLoading ? (
    <Backdrop className={classes.backdrop} open={true}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography color="primary">Cargando</Typography>
        <CircularProgress color="primary" />
      </Box>
    </Backdrop>
  ) : (
    <Route {...rest} />
  )
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)
