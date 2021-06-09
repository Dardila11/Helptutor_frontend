import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root:{
    margin: theme.spacing(3)
  },
  text:{
    marginBottom: theme.spacing(1)
  },
  cover:{
    margin: theme.spacing(1)
  },
  principalInformation:{
    marginRight: theme.spacing(6)
  },
  secondaryInformation: {
    marginRight: theme.spacing(3)
  },
  divider: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2)
  }
}))

const ProfileViewSkeleton = () => {
  const classes = useStyles()
  return (
    <Box className={classes.root} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
      <Skeleton className={classes.text} variant="rect"  width={150} height={30}/>
      <Skeleton className={classes.text} variant="rect"  width={100} height={30}/>
      <Skeleton variant='rect' width={650} height={5} />
      <Box display='flex' flexDirection='row'>
        <Box className={classes.principalInformation} display='flex' flexDirection='column' justifyContent='center'>
          <Skeleton className={classes.text} variant="rect"  width={450} height={20}/>
          <Skeleton className={classes.text} variant="rect"  width={450} height={20}/>
          <Skeleton className={classes.text} variant="rect"  width={450} height={20}/>
          <Skeleton className={classes.text} variant="rect"  width={450} height={20}/>
        </Box>
        <Box>
        <Skeleton className={classes.cover} variant="circle" width={140} height={140}/>
        </Box>
      </Box>
      <Skeleton variant='rect' width={650} height={5} />
      <Box display='flex' flexDirection='row'>
        <Box className={classes.secondaryInformation} display='flex' flexDirection='column' justifyContent='center'>
          <Skeleton className={classes.text} variant="rect"  width={450} height={20}/>
          <Skeleton className={classes.text} variant="rect"  width={450} height={20}/>
          <Skeleton className={classes.text} variant="rect"  width={450} height={20}/>
          <Skeleton className={classes.text} variant="rect"  width={450} height={20}/>
        </Box>
        <Box className={classes.divider}>
          <Skeleton variant='rect' width={5} height={120} />
        </Box>
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
          <Skeleton className={classes.cover} variant="rect" width={200} height={125}/>
        </Box>
      </Box>
    </Box>
  )
}

export default ProfileViewSkeleton
