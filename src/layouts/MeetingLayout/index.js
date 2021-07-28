import React from 'react'
import { Outlet } from 'react-router-dom'
import {
  makeStyles,
} from '@material-ui/core'
import MeetingBase from './Base'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#054f71c2",
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

const MeetingLayout = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <MeetingBase />
      <div className={classes.contentContainer}>
        <div className={classes.content}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MeetingLayout
