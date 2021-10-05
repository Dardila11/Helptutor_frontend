import React from 'react'

// ROUTER
import { Link as RouterLink, useLocation } from 'react-router-dom'

// CONTEXT
import { useAuthState } from 'src/context/context'

// LAYOUT
import TutorNavBar from '../TutorLayout/NavBar'
import StudentNavBar from '../StudentLayout/NavBar'
import TutorTopBar from '../TutorLayout/TopBar'
import StudentTopBar from '../StudentLayout/TopBar'
import NavBarMenu from './navBarMenu'

// STYLES
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles
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
  }
}))

const TOP_BAR = {
  tutor: <TutorNavBar />,
  estudiante: <StudentNavBar />
}

const MainNavBar = () => {
  const classes = useStyles()
  const location = useLocation()
  const { isAuthenticated, roles } = useAuthState()

  const topBar = TOP_BAR[location.pathname.split('/')[1]] || null

  const guestLink = (
    <div>
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
    </div>
  )

  const authLink =
    location.pathname.split('/')[1] === '' ? (
      roles[0] && roles[1] ? (
        <NavBarMenu />
      ) : roles[0] && !roles[1] ? (
        <TutorTopBar />
      ) : !roles[0] && roles[1] ? (
        <StudentTopBar />
      ) : null
    ) : location.pathname.split('/')[1] === 'tutor' ? (
      <TutorTopBar />
    ) : location.pathname.split('/')[1] === 'estudiante' ? (
      <StudentTopBar />
    ) : null

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.toolbar}>
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
        {isAuthenticated ? authLink : guestLink}
      </Toolbar>
      {topBar}
    </AppBar>
  )
}

export default MainNavBar
