import React from 'react'
import { Outlet } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import TutorTopBar from './TopBar'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}))

export const TutorLayout = () => {
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
