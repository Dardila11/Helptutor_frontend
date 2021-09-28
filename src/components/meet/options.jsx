import React, { useState, useContext } from 'react';
import { Button, TextField, Grid, Container, Paper, Box} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CallEndIcon from '@material-ui/icons/CallEnd';
import VideocamIcon from '@material-ui/icons/Videocam';
import MicIcon from '@material-ui/icons/Mic';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, MicOff, Phone, PhoneDisabled, VideocamOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { SocketContext } from 'src/SocketContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridContainer: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  container: {
    width: '600px',
    margin: '35px 0',
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    border: '2px solid black',
    borderRadius: '20px'
  },
  options: {
    display: 'flex',
    flexDirection: 'row',

  }
}));

const MeetOptions = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  const classes = useStyles();
  const [cam, setCam] = useState(true)
  const [mic, setMic] = useState(true)

  const endCall = () => {
    if(callAccepted && !callEnded) leaveCall()
    else window.history.back()
  }

  const offCam = () => {
    if(cam) setCam(false)
    else setCam(true)
  }

  const offMic = () => {
    if(mic) setMic(false)
    else setMic(true)
  }

  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={6} className={classes.padding}>
              <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
              <CopyToClipboard text={me} className={classes.margin}>
                <Button variant="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large" />}>
                  Copy Your ID
                </Button>
              </CopyToClipboard>
            </Grid>
            <Grid item xs={12} md={6} className={classes.padding}>
              <TextField label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
              {callAccepted && !callEnded ? (
                <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leaveCall} className={classes.margin}>
                  Hang Up
                </Button>
              ) : (
                <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => callUser(idToCall)} className={classes.margin}>
                  Call
                </Button>
              )}
            </Grid>
            <Grid item xs={12}>
              <Box display='flex' flexDirection='row' justifyContent='center'>
                <IconButton size='medium' onClick={offCam}>
                  {cam && <VideocamIcon fontSize="large"/>}
                  {!cam && <VideocamOff fontSize='large'/>}
                </IconButton>
                <IconButton size='medium' onClick={offMic}>
                  {mic && <MicIcon fontSize="large"/>}
                  {!mic && <MicOff fontSize="large"/>}
                </IconButton>
                <IconButton size='medium' onClick={endCall}>
                  <CallEndIcon style={{color: '#d50000'}} fontSize="large"/>
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
};

export default MeetOptions;