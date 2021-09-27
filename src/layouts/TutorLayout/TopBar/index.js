import React from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import {
  Toolbar,
  Typography,
  Button,
  makeStyles,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  AppBar,
  Backdrop,
  Box,
  CircularProgress
} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import HelpIcon from '@material-ui/icons/Help'
import TutorNavBar from 'src/layouts/TutorLayout/NavBar'
import logo from 'src/layouts/TutorLayout/logo.svg'

import { useAuthState } from 'src/context/context'

import { logout, useAuthDispatch } from 'src/context'

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(1)
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  inputRoot: {
    color: 'inherit'
  },
  cover: {
    width: 30,
    height: 30,
    color: theme.palette.getContrastText('#1769aa'),
    backgroundColor: '#1769aa'
  },
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
  logout: {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(1),
    color: theme.palette.common.white
  },
  icon: {
    marginLeft: theme.spacing(1)
  },
  role: {
    marginRight: theme.spacing(2)
  },
  menuItem: {
    justifyContent: 'space-between'
  }
}))

const TutorTopBar = (props) => {
  const navigate = useNavigate()
  const user = useAuthState()
  const dispatch = useAuthDispatch()
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  async function handleLogOut() {
    navigate('/login')
    await logout(dispatch)
  }

  return (
    <AppBar position="sticky">
      <Box display="flex" flexDirection="column" justifyContent="center">
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
            <Box>
              <IconButton
                className={classes.userSpace}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleClick}>
                <Typography className={classes.userSpace} variant="h4">
                  {user.user !== '' ? (
                    <>
                      {user.user.first_name} {user.user.last_name}
                    </>
                  ) : (
                    <></>
                  )}
                </Typography>
                <Avatar
                  className={classes.cover}
                  alt="user photo"
                  src={user.user.photo}>
                  <b>{user.user.first_name[0]}</b>
                </Avatar>
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <RouterLink to="/tutor/cuenta">
                  <MenuItem onClick={handleClose}>
                    <Typography color="primary">
                      <b>Cuenta</b>
                    </Typography>
                  </MenuItem>
                </RouterLink>
                {/* {props.isStudent && props.isTutor ? (
                    <RouterLink to="/seleccion-rol">
                      <MenuItem onClick={handleClose}>
                        <Typography color="primary">
                          <b>Cambiar de rol</b>
                        </Typography>
                      </MenuItem>
                    </RouterLink>
                  ) : (
                    <></>
                  )} */}
                <Divider></Divider>
                <RouterLink to="/como-funciona">
                  <MenuItem className={classes.menuItem} onClick={handleClose}>
                    <Typography color="primary">
                      <b>Como funciona</b>
                    </Typography>
                    <HelpIcon className={classes.icon} />
                  </MenuItem>
                </RouterLink>
                <MenuItem className={classes.menuItem} onClick={handleLogOut}>
                  <Typography color="primary">
                    <b>Salir</b>
                  </Typography>
                  <ExitToAppIcon className={classes.icon} />
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
          <TutorNavBar />
        </Box>
    </AppBar>
  )
}

export default TutorTopBar
