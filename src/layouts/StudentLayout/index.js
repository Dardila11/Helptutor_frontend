import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import { Outlet } from 'react-router-dom'
import StudentNavBar from '../StudentLayout/TopBar'

import { getStudentInfo } from 'src/redux/actions/student_data'
import { connect } from 'react-redux'

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

const StudentLayout = (props) => {
  const classes = useStyles()
  const {getStudentInfo, user} = props
  useEffect(
    () => {
      getStudentInfo(user.id)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [])
  return (
    <div className={classes.root}>
      <StudentNavBar />
      <div className={classes.contentContainer}>
        <div className={classes.content}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

export default connect(mapStateToProps, {
  getStudentInfo
})(StudentLayout)
