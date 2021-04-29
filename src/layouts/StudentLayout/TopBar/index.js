import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Toolbar,
  Typography,
  Button,
  makeStyles,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider
} from '@material-ui/core'
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
  coverAnswer: {
    width: 30,
    height: 30
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

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
            <div className={classes.userSection}>
              <IconButton
                className={classes.userSpace}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleClick}>
                <Typography className={classes.userSpace} variant="h4">
                  {props.user != null ? (
                    <>
                      {props.user.first_name} {props.user.last_name}
                    </>
                  ) : (
                    <></>
                  )}
                </Typography>
                <Avatar className={classes.coverAnswer} alt='user photo' src={props.user.photo}/>
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >                
                <RouterLink to="/estudiante/cuenta/perfil"> 
                  <MenuItem onClick={handleClose}> 
                    <Typography color='primary'><b>Perfil</b></Typography>
                  </MenuItem>
                </RouterLink>
                <RouterLink to="/estudiante/cuenta"> 
                  <MenuItem onClick={handleClose}> 
                    <Typography color='primary'><b>Cuenta</b></Typography>
                  </MenuItem>
                </RouterLink>
                <Divider></Divider>
                <MenuItem onClick={handleLogOut}>
                  <Typography color='primary'><b>Salir</b></Typography>
                  <ExitToAppIcon className={classes.exitIcon}/>
                </MenuItem>
              </Menu>
            </div>
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
