import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Avatar, Box, CardActionArea, Dialog, Grid, Paper } from '@material-ui/core';
import AnswerView from 'src/views/studentviews/advertisements/answers/answer'

import { clearAnswers } from 'src/redux/actions/advertisements'
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: 150,
    
    margin: theme.spacing(1),
    borderRadius: '20px',
    border: '0px'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(3),
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
  const { advertisement, clearAnswers } = props
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
          <Avatar className={classes.cover} alt='user photo' src='/static/images/avatars/avatar_6.png'/>
        </Grid>
        <Grid item xs={10}>
          <Box className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                <Box fontWeight="fontWeightBold">
                  {advertisement.title} 
                </Box>
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {advertisement.description}
              </Typography>
            </CardContent>
        </Box>
        </Grid>
      </Grid>
      </CardActionArea>
      <Dialog
          open={open}
          onClose={handleClose}    
          aria-labelledby={idDialog}
      >
        <AnswerView id={advertisement.id} advertisement={advertisement}/>
      </Dialog>
    </Card>
    </Paper>
  );
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps,{
  clearAnswers
})(AdvertisementCard)