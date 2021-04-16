import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Toolbar,
  Typography,
  Button,
  makeStyles,
  IconButton
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import StudentNavBar from 'src/layouts/StudentLayout/NavBar'
import logo from 'src/layouts/TutorLayout/logo.svg'

/* Redux */
import { connect } from 'react-redux'
import { logout } from 'src/redux/actions/auth'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
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
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
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
    backgroundColor: theme.palette.primary.main
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

const StudentTopBar = (props) => {
  const classes = useStyles()

  const handleLogOut = () => {
    props.logout()
  }

  return (
    <div className={classes.grow}>
      <Toolbar className={classes.toolbar} color="primary">
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
        <StudentNavBar />
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <RouterLink to="/estudiante/cuenta/perfil">
            <div className={classes.userSection}>
              <IconButton
                className={classes.userSpace}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit">
                <Typography className={classes.userSpace} variant="h4">
                  {props.user != null ? (
                    <>
                      {props.user.first_name} {props.user.last_name}
                    </>
                  ) : (
                    <></>
                  )}
                </Typography>
                <AccountCircle />
              </IconButton>
            </div>
          </RouterLink>
          <IconButton onClick={handleLogOut} className={classes.logout}>
            <Typography variant="h4">Salir</Typography>
            <ExitToAppIcon className={classes.exitIcon} />
          </IconButton>
        </div>
      </Toolbar>
    </div>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})

export default connect(mapStateToProps, {
  logout
})(StudentTopBar)
