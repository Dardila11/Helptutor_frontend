import React from 'react'
import { Outlet } from 'react-router-dom'
import {
  Backdrop,
  Box,
  CircularProgress,
  makeStyles,
  Typography
} from '@material-ui/core'
import StudentTopBar from './TopBar'

import { useStudentInfo } from 'src/hooks/StudentHooks/useStudentInfo'
import { useAuthState } from 'src/context/context'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    overflow: 'auto',
    backgroundImage: `url(https://i.redd.it/ihfnlpbze7o01.jpg)`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  },
  topbarContainer: {
    marginTop: theme.spacing(8)
  },
  contentContainer: {
    display: 'flex',
    overflow: 'hidden',
    
  },
  content: {
    flex: '1 1 auto',
    overflow: 'hidden',
    marginRight: theme.spacing(3)    
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.common.white
  }
}))

const StudentLayout = () => {
  const classes = useStyles()
  const userId = useAuthState().user.id
  const studentInfoQuery = useStudentInfo(userId)
  
  return studentInfoQuery.isLoading ? (
    <Backdrop className={classes.backdrop} open={true}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography component="span" color="primary">Cargando</Typography>
        <CircularProgress color="primary" />
      </Box>
    </Backdrop>
  ) : (
    <div className={classes.root}>
      <div className={classes.topbarContainer}>
      <StudentTopBar />
      </div>
      <div className={classes.contentContainer}>
        <div className={classes.content}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default StudentLayout
