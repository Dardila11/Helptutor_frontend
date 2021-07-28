import { Box, Grid,Typography, Paper, makeStyles } from '@material-ui/core'
import React, { useContext } from 'react'
import AlertComponent from 'src/components/Alert'

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
        border: '2px solid black',
        margin: '10px',
      },
}))

const MeetVideo = (props) => {
    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call, error } = useContext(SocketContext);
    const classes = useStyles();
    return (
        <Box>
            {error!=null && <AlertComponent alert={{msg : "Error cargando video", status : "error"}}/> }
            <Grid container className={classes.gridContainer}>
                {stream && (
                    <Paper className={classes.paper}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
                        <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
                    </Grid>
                    </Paper>
                )}
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