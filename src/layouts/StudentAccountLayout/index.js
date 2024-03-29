import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Outlet } from 'react-router-dom'
import StudentNavBar from '../StudentLayout/TopBar'
import NavBar from './NavBar'

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
    marginRight: theme.spacing(3)
  }
}))

const StudentAccountLayout = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.topbarContainer}>
      <StudentNavBar />
      </div>
      <div className={classes.contentContainer}>
        <NavBar />
        <div className={classes.content}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default StudentAccountLayout
