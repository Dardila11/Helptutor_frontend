import React from 'react'
import { Route } from 'react-router-dom'
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

const PrivateRoute = ({ loading, children, ...rest }) => {
  const classes = useStyles()

  return loading? (
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

export default PrivateRoute
