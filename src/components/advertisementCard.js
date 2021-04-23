import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { Avatar, Box, CardActionArea, Dialog, Grid, Paper } from '@material-ui/core';
import AnswerView from 'src/views/studentviews/advertisements/answers/answer'

import { clearAnswers } from 'src/redux/actions/advertisements'
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: 120,
    
    margin: theme.spacing(1),
    borderRadius: '20px',
    border: '0px'
  },
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
    borderRadius: '20px',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  },
  options: {
      borderTop: theme.spacing(2)
  },
  cardAction: {
    border: 0
  }
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
    <Card className={classes.root}>
          <CardActionArea className={classes.cardAction} onClick={handleOpen}>
            <Grid container >
              <Grid item xs={2}>
                  <Box display='flex' flexDirection='column' alignItems='center' textAlign='center'>
                    <Avatar className={classes.cover} alt='user photo' src='/static/images/avatars/avatar_6.png'/>
                    {/*<Typography>
                        {student.user.first_name} {student.user.last_name}
                    </Typography>*/}
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
    </Card>
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  student : state.advertisements.advertisement.student
})

export default connect(mapStateToProps,{
  clearAnswers
})(AdvertisementCard)