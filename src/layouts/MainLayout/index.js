import React from 'react'

// ROUTER
import { Outlet } from 'react-router-dom'

// COMPONENTS
import MainNavBar from './navbar'

// STYLES
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%'
  },
  container: {
    margin: '1rem 2rem'
  }
}))

export const MainLayout = () => {
  const classes = useStyles()
  
  return (
    <div className={classes.root}>
      <MainNavBar />
      <div className={classes.container}>
        <Outlet/>
      </div>
    </div>
  )
}
