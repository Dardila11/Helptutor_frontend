import React from 'react'
import { Outlet } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import TutorTopBar from './TopBar'
import { ToastContainer } from 'react-toastify'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    overflow: 'auto'
  },
  container: {
    margin: '2rem 1rem'
  },
}))

const TutorLayout = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <TutorTopBar />
      <div className={classes.container}>
        <Outlet />
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  )
}

export default TutorLayout
