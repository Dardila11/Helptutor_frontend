import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Outlet } from 'react-router-dom'
import TutorTopBar from 'src/layouts/TutorLayout/TopBar'
import NavBar from './NavBar'
import { ToastContainer } from 'react-toastify'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    overflow: 'auto'
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    margin: theme.spacing(1)
  },
  topbarContainer: {
    marginTop: theme.spacing(8)
  },
  content: {
    flex: '1 1 auto',
    overflow: 'hidden',
    marginRight: theme.spacing(3),
  }
}))

const TutorAccountLayout = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.topbarContainer}>
      <TutorTopBar />
      </div>
      <div className={classes.contentContainer}>
        <NavBar />
        <div className={classes.content}>
          <Outlet />
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} closeOnClick pauseOnFocusLoss draggable pauseOnHover/>
    </div>
  )
}

export default TutorAccountLayout
