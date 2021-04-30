import React, { useEffect } from 'react'
import { makeStyles, Backdrop, Typography, CircularProgress, Box } from '@material-ui/core'
import { Outlet } from 'react-router-dom'
import StudentNavBar from '../StudentLayout/TopBar'

import { getStudentInfo } from 'src/redux/actions/student/student_data'
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
  },
  backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: theme.palette.common.white
    },
}))

const StudentLayout = (props) => {
  const classes = useStyles()
  const {getStudentInfo, user, loading} = props
  useEffect(
    () => {
      getStudentInfo(user.id)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [])
  return (
    loading ? (
      <Backdrop className={classes.backdrop} open={true}>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Typography color='primary'>Cargando</Typography>
        <CircularProgress color="primary" />
        </Box>
      </Backdrop>
    ):(
      <div className={classes.root}>
      <StudentNavBar />
      <div className={classes.contentContainer}>
        <div className={classes.content}>
          <Outlet />
        </div>
      </div>
    </div>
    )
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.studentInfo.isLoading
})

export default connect(mapStateToProps, {
  getStudentInfo
})(StudentLayout)
