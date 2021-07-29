import { Box, Grid,Typography, Paper, makeStyles, Avatar } from '@material-ui/core'
import React, { useContext } from 'react'

import { deepOrange } from '@material-ui/core/colors'

import { SocketContext } from 'src/SocketContext'

const useStyles = makeStyles((theme) => ({
    video: {
        width: '550px',
        [theme.breakpoints.down('xs')]: {
          width: '300px',
        },
      },
      gridContainer: {
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
          flexDirection: 'column',
        },
      },
      paper: {
        padding: '10px',
        border: '5px solid grey',
        margin: '10px',
        borderRadius: '20px'
      },
      avatar: {
        width: '200px',
        height: '200px',
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500]
      }
}))

const MeetVideo = (props) => {
    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call, error } = useContext(SocketContext);
    const {user} = props
    const classes = useStyles();
    return (
        <Box>
          <Grid container className={classes.gridContainer}>
            {!error.err && stream ? 
              <Paper className={classes.paper}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>{user.first_name+" "+user.last_name}</Typography>
                    <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
                </Grid>
              </Paper>
              : 
              <Paper className={classes.paper}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom><b>{user.first_name+" "+user.last_name}</b></Typography>
                    <Box className={classes.video} display='flex' flexDirection='column' alignItems='center'>
                      <Avatar className={classes.avatar}>
                        <Typography variant='h1'>N</Typography>
                        </Avatar>
                    </Box>
                </Grid>
              </Paper> 
              }
                {callAccepted && !callEnded && (
                    <Paper className={classes.paper}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
                        <video playsInline ref={userVideo} autoPlay className={classes.video} />
                    </Grid>
                    </Paper>
                )}
            </Grid>
        </Box>
    )
}

export default MeetVideo