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
  Box
} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import StudentNavBar from 'src/layouts/StudentLayout/NavBar'
import logo from 'src/layouts/TutorLayout/logo.svg'
import ScrollArrow from 'src/components/ScrollArrow'

import { useAuthState} from 'src/context/context'
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
  exitIcon: {
    marginLeft: theme.spacing(1)
  }
}))

const StudentTopBar = () => {
  const navigate = useNavigate()
  const { user, roles } = useAuthState()
  const dispatch = useAuthDispatch()
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogOut = async () => {
    navigate('/login')
    await logout(dispatch)
  }

  return (
    <Box display='flex' flexDirection='column' justifyContent='center'>
      <Box>
        <AppBar position='absolute'>
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
            <div className={classes.grow} />
              <div className={classes.userSection}>
                <IconButton
                  className={classes.userSpace}
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleClick}>
                  <Typography className={classes.userSpace} variant="h4">
                    {user != null ? (
                      <>
                        {user.first_name} {user.last_name}
                      </>
                    ) : (
                      <></>
                    )}
                  </Typography>
                  <Avatar
                  className={classes.cover}
                  alt="user photo"
                  src={user.photo}
                >
                  <b>{user.first_name[0]}</b>
                </Avatar>
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}>
                  <RouterLink to="/estudiante/cuenta">
                    <MenuItem onClick={handleClose}>
                      <Typography color="primary">
                        <b>Cuenta</b>
                      </Typography>
                    </MenuItem>
                  </RouterLink>
                  {roles[0] && roles[1] ? (
                    <RouterLink to="/seleccion-rol">
                      <MenuItem onClick={handleClose}>
                        <Typography color="primary">
                          <b>Cambiar de rol</b>
                        </Typography>
                      </MenuItem>
                    </RouterLink>
                  ) : null}
                  <Divider></Divider>
                  <MenuItem onClick={handleLogOut}>
                    <Typography color="primary">
                      <b>Salir</b>
                    </Typography>
                    <ExitToAppIcon className={classes.exitIcon} />
                  </MenuItem>
                </Menu>
              </div>
          </Toolbar>
          </AppBar>
          <ScrollArrow />
      </Box>
      <Box>
        <StudentNavBar />
      </Box>
    </Box>
  )
}

export default StudentTopBar
