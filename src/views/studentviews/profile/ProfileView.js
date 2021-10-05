import React from 'react'
import { Card, Divider, makeStyles } from '@material-ui/core'
import { capitalize } from 'lodash-es'
import ProfileViewSkeleton from 'src/components/skeletons/ProfileViewSkeleton'
import Page from 'src/components/Page'
import { useStudentInfo,  } from 'src/hooks/StudentHooks/useStudentInfo'
import { useAuthState } from 'src/context/context'

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '800px',
    padding: '20px',
    borderRadius: '20px'
  }
}))

const StudentProfileView = () => {
  const classes = useStyles()
  const { user } = useAuthState()
  const userInfoQuery = useStudentInfo(user.id)

  return (
    <Page title="Perfil">
      <Card className={classes.root}>
        {userInfoQuery.status === 'success' ? (
          <>
            <h1>
              {' '}
              {capitalize(userInfoQuery.data.user.first_name)} {capitalize(userInfoQuery.data.user.last_name)}
            </h1>
            <h3> Estudiante </h3>
            <Divider />
          </>
        ) : (
          <ProfileViewSkeleton />
        )}
      </Card>
    </Page>
  )
}

export default StudentProfileView
