import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Avatar, Box, CardActionArea, Dialog, Grid, Paper } from '@material-ui/core';
import AnswerView from 'src/views/studentviews/advertisements/answers/answer'

import { clearAnswers } from 'src/redux/actions/student/advertisements'
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  details: {
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 60,
    height: 60
  },
  paper: {
    display: 'flex',
    height: 120,
    borderRadius: '20px',
    margin: theme.spacing(1),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  },
  options: {
      borderTop: theme.spacing(2)
  },
  cardAction: {
    borderRadius: '20px'
  },
  userSpace: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
}));

const AdvertisementCard = (props) => {
  const { advertisement, clearAnswers, student} = props
  const [open, setOpen] = useState(false)
  const classes = useStyles();
  const idDialog = 'advertisement'+advertisement.id+'-dialog-title'

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    clearAnswers()
  }
  return (
    
    <Paper className={classes.paper} elevation={3}>
          <CardActionArea className={classes.cardAction} onClick={handleOpen}>
            <Grid container >
              <Grid item xs={2}>
              <Box className={classes.userSpace} >
                <Avatar className={classes.cover} alt='user photo' src='/static/images/avatars/avatar_6.png'/>
                <Typography><b>Username</b></Typography>
              </Box>
              </Grid>
              <Grid item xs={10}>
                <Box className={classes.details}>
                    <Typography component="h5" variant="h5">
                      <Box fontWeight="fontWeightBold">
                        {advertisement.title} 
                      </Box>
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {advertisement.description}
                    </Typography>
              </Box>
              </Grid>
            </Grid>
            </CardActionArea>
            <Dialog
                open={open}
                onClose={handleClose}    
                aria-labelledby={idDialog}
            >
              <AnswerView id={advertisement.id} advertisement={advertisement} student={student}/>
            </Dialog>
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  student : state.advertisements.advertisement.student
})

export default connect(mapStateToProps,{
  clearAnswers
})(AdvertisementCard)