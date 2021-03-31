import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Outlet } from 'react-router-dom'
import TutorTopBar from '../TutorLayout/TopBar'
import NavBar from './NavBar'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    overflow: 'auto',
    width: '100%'
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'scroll'
  }
}))

export const TutorAccountLayout = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <TutorTopBar />
      <div className={classes.contentContainer}>
        
        <div className={classes.content}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
