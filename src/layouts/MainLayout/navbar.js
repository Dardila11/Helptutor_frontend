import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  Box
} from '@material-ui/core'

import logo from './logo.svg'
const useStyles = makeStyles((theme) => ({
  button: {
    border: '0px',
    color: 'white'
  },
  userSection: {
    color: 'white',
    margin: theme.spacing(0)
  },
  userSpace: {
    color: theme.palette.common.white,
    marginRight: theme.spacing(1)
  },
  toolbar: {
    backgroundColor: theme.palette.primary.main,
    justifyContent: 'space-between'
  },
  img: {
    color: theme.palette.common.white
  },
}))

const MainNavBar = () => {
  const classes = useStyles()

  return (
    <Box display='flex' flexDirection='column' justifyContent='center'>
      <Box>
        <AppBar position='static'>
          <Toolbar className={classes.toolbar} >
            <Button className={classes.button} variant="outlined" href="/">
              <img
                className={classes.img}
                src={logo}
                width="50"
                alt="LogoImage"></img>
              <Typography
                className={classes.title}
                variant="h2"
                color="initial"
                noWrap>
                HELPTUTOR
              </Typography>
            </Button>            
            <Box className={classes.userSection}>
              <RouterLink to="/registrar">
                <Button className={classes.button} variant="outlined">
                  <span>
                    <b>Registrarme</b>
                  </span>
                </Button>
              </RouterLink>
              <RouterLink to="/login">
                <Button className={classes.button} variant="outlined">
                  <span>
                    <b>Iniciar Sesión</b>
                  </span>
                </Button>
              </RouterLink>
            </Box>
            </Toolbar>
          </AppBar>
      </Box>
    </Box>
  )
}

export default MainNavBar
