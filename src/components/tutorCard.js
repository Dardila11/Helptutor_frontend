import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Avatar, Box, Grid, Paper } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: 150,
    
    margin: theme.spacing(1),
    borderRadius: '20px'
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
    width: 90,
    height: 90
  },
  paper: {
    borderRadius: '20px',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  methodology: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2)
  }
}));

const TutorCard = (props) => {
  const { tutor } = props
  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={3}>
    <Card className={classes.root}>
      <Grid container >
        <Grid item xs={2}>
          <Avatar className={classes.cover} alt='user photo' src='/static/images/avatars/avatar_6.png'/>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                <Box fontWeight="fontWeightBold">
                  {tutor.user.first_name} {tutor.user.last_name}
                </Box>
              </Typography>
              <Rating name="read-only" value={tutor.score} readOnly />
              <Typography variant="subtitle1" color="textSecondary">
                {tutor.skills}
              </Typography>
            </CardContent>
        </div>
        </Grid>
        <Grid item xs={6}>
            <Typography color="textSecondary">
               <Box className={classes.methodology} textAlign="justify" fontWeight={500}>
                  {tutor.methodology}
               </Box>
            </Typography>
        </Grid>
      </Grid>
    </Card>
    </Paper>
  );
}

export default TutorCard