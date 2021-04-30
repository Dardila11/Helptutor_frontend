import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Avatar, Box, CardActionArea, Dialog, Grid, Paper } from '@material-ui/core';
import NominationView from 'src/views/tutorviews/publications/nomination';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: 120,
    
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
    width: 60,
    height: 60
  },
  paper: {
    borderRadius: '20px',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  options: {
    marginTop: theme.spacing(2)
  }
}));

const TutorPublicationCard = (props) => {
  const { publication} = props
  const classes = useStyles();
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
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
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  <Box fontWeight="fontWeightBold">
                    {publication.title} 
                  </Box>
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {publication.description}
                </Typography>
              </CardContent>
          </Box>
          </Grid>
        </Grid>
      </CardActionArea>
      <Dialog 
        open={open}
        onClose={handleClose}    
        aria-labelledby='tutorSelection-dialog-title'>
          <NominationView publication={publication} closeDialog={handleClose}/>
      </Dialog>
    </Card>
    </Paper>
  );
}

export default TutorPublicationCard