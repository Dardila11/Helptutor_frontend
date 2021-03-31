import React, { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import {
  Toolbar,
  Typography,
  Button,
  makeStyles,
  IconButton
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import InboxIcon from '@material-ui/icons/Inbox'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import BookIcon from '@material-ui/icons/Book'
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications'
import ScheduleIcon from '@material-ui/icons/Schedule'
import CastForEducationIcon from '@material-ui/icons/CastForEducation'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
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
  }
}))

const TutorTopBar = (props) => {
  const classes = useStyles()
  const [show, setShow] = useState(true)

  const handleLogOut = () => {
    props.logout()
  }

  return (
    <div>
      <header>
        <div className="content-header">
        <span onClick={() => setShow(true)}><ChevronRightIcon /></span>
          <div className="logo-header">
            <h4>HelpTutor</h4>
          </div>
          <div className="options-header">
            <ul>
              <li>Noticias</li>
              <li>Servicios</li>
              <li>Ofertas</li>
            </ul>
            <div className="sep-vertical"></div>
            <div className="action-header">
              <Button onClick={handleLogOut}>
                <ExitToAppIcon />
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div
        className={
          'navbar-lateral' + (show ? ' show-transition' : ' hidden-transition')
        }>
        <header>
          <div className="content-header">
            
            <div className="logo-header">
              <h4>HelpTutor</h4>
            </div>
            <div className="options-header">
              <div className="action-header">
                <Button onClick={() => setShow(false)}>
                  <ArrowBackIosIcon />
                </Button>
              </div>
            </div>
          </div>
        </header>
        <ul>
          <li>
            <div className="profile-photo">
              <img
                src="http://localhost:3000/static/images/avatars/avatar_6.png"
                alt="image-profile"
              />
            </div>
          </li>
          <RouterLink to="/tutor/cuenta/perfil">
            <li
              className="item-navbar select-item"
              onClick={() => {
                setShow(false)
              }}>
              <AccountBoxIcon />
              <span>Perfil</span>
            </li>
          </RouterLink>
          <RouterLink to="/tutor/cuenta/asesorias">
            <li
              className="item-navbar"
              onClick={() => {
                setShow(false)
              }}>
              <BookIcon />
              <span>Asesorías</span>
            </li>
          </RouterLink>
          <RouterLink to="/tutor/cuenta/servicios">
            <li
              className="item-navbar"
              onClick={() => {
                setShow(false)
              }}>
              <CastForEducationIcon />
              <span>Servicios</span>
            </li>
          </RouterLink>
          <RouterLink to="/tutor/cuenta/horarios">
            <li
              className="item-navbar"
              onClick={() => {
                setShow(false)
              }}>
              <ScheduleIcon />
              <span>Horarios</span>
            </li>
          </RouterLink>
          <RouterLink to="/tutor/cuenta/configuracion">
            <li
              className="item-navbar"
              onClick={() => {
                setShow(false)
              }}>
              <SettingsApplicationsIcon />
              <span>Configuración</span>
            </li>
          </RouterLink>
        </ul>
      </div>
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
