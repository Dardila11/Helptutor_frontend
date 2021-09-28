import React from 'react'
import { makeStyles, Grid } from '@material-ui/core'
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
  container: {
    margin: '2rem 1rem'
  },
  menu: {
    padding: '0 1rem',
    paddingBottom: '0.5rem'
  }
}))

const TutorAccountLayout = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <TutorTopBar />
      <dir className={classes.container}>
        <Grid container className={classes.contentContainer}>
          <Grid item xs={12} md={3} className={classes.menu}>
            <NavBar />
          </Grid>
          <Grid item xs={12} md={9} style={{ padding: '0 1rem' }}>
            <Outlet />
          </Grid>
        </Grid>
      </dir>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  )
}

export default TutorAccountLayout
