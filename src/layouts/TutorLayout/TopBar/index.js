import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Typography,
  makeStyles,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import HelpIcon from '@material-ui/icons/Help'

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

const TutorTopBar = () => {
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

  async function handleLogOut() {
    logout(dispatch)
  }

  return (
    <div>
      <IconButton
        className={classes.userSpace}
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={handleClick}>
        <Typography className={classes.userSpace} variant="h4">
          {user.first_name} {user.last_name}
        </Typography>
        <Avatar className={classes.cover} alt="user photo" src={user.photo}>
          {user != null ? <b>{user.first_name[0]}</b> : null}
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
        {roles[0] && roles[1] ? (
          <RouterLink to="/seleccion-rol">
            <MenuItem onClick={handleClose}>
              <Typography color="primary">
                <b>Cambiar de rol</b>
              </Typography>
            </MenuItem>
          </RouterLink>
        ) : null}
        <Divider />
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
    </div>
  )
}

export default TutorTopBar
