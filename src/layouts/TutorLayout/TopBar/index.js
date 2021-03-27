import React, { useEffect } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import {
  Toolbar,
  Typography,
  Button,
  makeStyles,
  IconButton
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TutorNavBar from '../NavBar'
import logo from '../logo.svg'

/* Redux */
import { connect } from 'react-redux'
import { logout } from '../../../redux/actions/auth'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    marginBlockEnd: theme.spacing(2)
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
  userSection:{
    color: 'white',
    margin : theme.spacing(0)
  },
  userSpace: {
    color : theme.palette.common.white,
    marginRight : theme.spacing(1)
  },
  toolbar: {
    backgroundColor: theme.palette.primary.main
  },
  img: {
    color: theme.palette.common.white
  }
}))

const TutorTopBar = (props) => {
  const classes = useStyles()
  let navigate = useNavigate()
  
  const handleLogOut = () => {
    console.log('saliendo')
    props.logout()
  }

  useEffect(() => {
    if (!props.isAuthenticated) navigate('/login')
  }, [props.isAuthenticated])

  return (
    <div className={classes.grow}>
        <Toolbar className={classes.toolbar}color="primary" >
          <Button className={classes.button} variant="outlined" href="/">
            <img className={classes.img}
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
          <TutorNavBar/>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <RouterLink to="/tutor/cuenta">
              <div className={classes.userSection}>
                <IconButton
                  className={classes.userSpace}
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit">
                  <Typography className={classes.userSpace} variant="h4">
                    {props.user!=null? (
                        <>{props.user.first_name} {props.user.last_name}</>
                    ):(
                      <></>
                    )}
                    
                  </Typography>
                  <AccountCircle />
                </IconButton>
              </div>
            </RouterLink>
            <Button endIcon={<ExitToAppIcon/>} onClick={handleLogOut}>
                  Salir
            </Button>
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
})(TutorTopBar)

