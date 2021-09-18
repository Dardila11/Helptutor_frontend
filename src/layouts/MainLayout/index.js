import React from 'react'
import { Outlet } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import MainNavBar from './navbar'
import { ToastContainer } from 'react-toastify'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    overflow: 'auto'
  },
  contentContainer: {
    display: 'flex',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    overflow: 'hidden',
    marginTop: theme.spacing(8)
  }
}))

export const MainLayout = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <MainNavBar />
      <div className={classes.contentContainer}>
        <div className={classes.content}>
          <Outlet />
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} closeOnClick pauseOnFocusLoss draggable pauseOnHover/>
    </div>
  )
}
