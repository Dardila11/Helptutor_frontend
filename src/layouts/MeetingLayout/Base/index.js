import React from 'react'
import { Box, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    },
    color: '#00162063'
  },
  header: {
    border: '0px',
    color: 'white',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2)
  },
}))

const MeetingBase  = () => {
  const classes = useStyles()
  return (
    <Box display='flex' flexDirection='column' justifyContent='center'>
      <Box>
          <Box className={classes.header} display='flex' flexDirection='row' alignItems='center'>
              <Typography
                className={classes.title}
                variant="h3"
                color="initial"
                noWrap>
                HELPTUTOR
              </Typography>
            </Box>
      </Box>
    </Box>
  )
}

export default MeetingBase