import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Avatar, Box, CardActionArea, Container, Dialog, Grid, Paper } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import ServiceSelectionView from 'src/views/studentviews/tutors/serviceSelectionView'

const useStyles = makeStyles((theme) => ({
  userSpace: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
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
    marginRight: theme.spacing(3),
  },
  methodology: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2)
  },
  price: {
    color: '#1ad41a',
    marginTop: theme.spacing(2),
    textAlign: 'center'
  }
}));

const TutorServiceCard = (props) => {
  const { service } = props
  const classes = useStyles();
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Paper className={classes.paper} elevation={3}>
    <CardActionArea className={classes.cardAction} onClick={handleOpen}>
      <Grid container >
        <Grid item xs={2}>
          <Box className={classes.userSpace} >
            <Avatar className={classes.cover} alt='user photo' src='/static/images/avatars/avatar_6.png'/>
            <Typography><b>Username</b></Typography>
            <Rating name="read-only" size='small'  value={4} readOnly />
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Container className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                <Box fontWeight="fontWeightBold">
                  {service.title}
                </Box>
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {service.description}
              </Typography>
            </CardContent>
        </Container>
        </Grid>
        <Grid item xs={3}>
          <Container className={classes.price} >
              <Typography variant='subtitle1' color='textSecondary'>
                <b>Costo por hora</b>
              </Typography>
              <Typography variant="h4" >
                {service.price} $ 
              </Typography>
          </Container>
        </Grid>
      </Grid>
      </CardActionArea>
      <Dialog 
        open={open}
        onClose={handleClose}    
        aria-labelledby='tutorSelection-dialog-title'>
          <ServiceSelectionView />
      </Dialog>
    </Paper>
  );
}

export default TutorServiceCard