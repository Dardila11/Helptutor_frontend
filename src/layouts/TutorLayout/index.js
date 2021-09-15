import React from 'react'
import { Outlet } from 'react-router-dom'
import {
  Backdrop,
  Box,
  CircularProgress,
  makeStyles,
  Typography
} from '@material-ui/core'
import TutorTopBar from './TopBar'

import useTutorInfo from 'src/hooks/TutorHooks/useTutorInfo'
import { useAuthState } from 'src/context'

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
  const user = useAuthState()
  const {data, isLoading} = useTutorInfo(user.user.id)
  return isLoading ? ( 
    <Backdrop className={classes.backdrop} open={true}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography color="primary">Cargando</Typography>
        <CircularProgress color="primary" />
      </Box>
    </Backdrop>
  ) : (
    <div className={classes.root}>
      <div className={classes.topbarContainer}>
      <TutorTopBar userInfo={data}/>
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
