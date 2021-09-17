import React from 'react'
import { Outlet } from 'react-router-dom'
import {
  makeStyles
} from '@material-ui/core'
import TutorTopBar from './TopBar'

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
    marginRight: theme.spacing(3),
  },
  topbarContainer: {
    marginTop: theme.spacing(8)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.common.white
  }
}))

const TutorLayout = () => {
  const classes = useStyles()
  return (
          <div className={classes.root}>
            <div className={classes.topbarContainer}>
            <TutorTopBar/>
            </div>
            <div className={classes.contentContainer}>
              <div className={classes.content}>
                <Outlet />
              </div>
            </div>
        </div>
  )
}

export default TutorLayout
