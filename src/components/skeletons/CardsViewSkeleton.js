import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root:{
    margin: theme.spacing(2)
  },
  Card: {
    borderRadius: '20px',
    margin: theme.spacing(1)
  },
  button: {
    borderRadius: '10px',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}))

const CardsViewSkeleton = (props) => {
  const { type } = props
  const classes = useStyles()
  return (
    <Box className={classes.root} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
      <Skeleton variant="text" width={100} height={30}/>
      {type==='publications'? <Skeleton className={classes.button} variant="rect" width={200} height={40} />: <></>}
      {type==='advetisements'? 
        <Box display='flex' flexDirection='row' justifyContent='spaceBetween'>
          <Skeleton className={classes.button} variant="rect" width={200} height={40} />
          <Skeleton className={classes.button} variant="rect" width={200} height={40} />
        </Box> : <></>}
      <Skeleton className={classes.Card} variant="rect" width={850} height={125}/>
      <Skeleton className={classes.Card} variant="rect" width={850} height={125}/>
      <Skeleton className={classes.Card} variant="rect" width={850} height={125}/>
    </Box>
  )
}

export default CardsViewSkeleton
