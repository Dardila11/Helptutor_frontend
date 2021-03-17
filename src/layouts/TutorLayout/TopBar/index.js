import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  IconButton
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'

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
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  separate: {
    display: 'flex',
    paddingRight: '10px'
  },
  button: {
    border: '0px',
    color: 'white'
  },
  userSection:{
    color: 'white',
    margin : theme.spacing(0)
  },
  username: {
    marginRight : theme.spacing(1)
  }
}))

const TutorTopBar = () => {
  const classes = useStyles()
  
  return (
    <div className={classes.grow}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Button className={classes.button} variant="outlined" href="/">
            <img
              src="https://gitlab.com/alexvi/diagonals-react/-/raw/master/src/data/logo-removebg-preview.png"
              width="50"
              alt="LogoImage"
              >
              </img>
            <Typography
              className={classes.title}
              variant="h2"
              color="initial"
              noWrap>
              HELPTUTOR
            </Typography>
          </Button>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <RouterLink to="profile">
            <div className = {classes.userSection}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
              <Typography className={classes.username} variant='h4'>
                User Name
              </Typography>
                <AccountCircle color="action"/>
              </IconButton>
            </div>
            </RouterLink>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default TutorTopBar
