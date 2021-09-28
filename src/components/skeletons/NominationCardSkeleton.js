import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root:{
    
  },
  Card: {
    borderRadius: '20px',
    margin: theme.spacing(1)
  }
}))

const CardsViewSkeleton = () => {
  const classes = useStyles()
  return (
    <>
    <Box className={classes.root} display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
      <Skeleton className={classes.Card} variant="rect" width={250} height={200}/>
      <Skeleton className={classes.Card} variant="rect" width={250} height={200}/>
      <Skeleton className={classes.Card} variant="rect" width={250} height={200}/>
    </Box>
    </>
  )
}

export default CardsViewSkeleton
