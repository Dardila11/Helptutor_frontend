import React, { useEffect } from 'react'
import { Card, Divider, makeStyles } from '@material-ui/core'

import { getStudentInfo } from 'src/redux/actions/student_data'
import { connect } from 'react-redux'
import ProfileViewSkeleton from 'src/components/skeletons/ProfileViewSkeleton'
import Page from 'src/components/Page'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '800px',
    padding: '20px',
    borderRadius: '20px'
  }
}))

const StudentProfileView = (props) => {
  const classes = useStyles()
  const {user, userInfo, requestInProgress, getStudentInfo} = props
  useEffect(
    () => {
      getStudentInfo(user.id)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [])

  return (
    <Page title='Perfil'>
    <Card className= {classes.root}>
      {requestInProgress? (
        <ProfileViewSkeleton />
      ):(
        <>
          <h1> {userInfo.first_name} {userInfo.last_name} </h1>
          <h3> Estudiante </h3>
          <Divider />
        </>
      )}
    </Card>
    </Page>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  userInfo: state.studentInfo.userInfo,
  requestInProgress: state.studentInfo.requestInProgress
})

export default connect(mapStateToProps, {
  getStudentInfo
})(StudentProfileView)
