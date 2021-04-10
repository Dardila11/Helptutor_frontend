import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Outlet } from 'react-router-dom'
import TutorTopBar from 'src/layouts/TutorLayout/TopBar'
import NavBar from './NavBar'

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
    marginRight: theme.spacing(3)
  }
}))

const TutorAccountLayout = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <TutorTopBar />
      <div className={classes.contentContainer}>
        <NavBar />
        <div className={classes.content}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default TutorAccountLayout
