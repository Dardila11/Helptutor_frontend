import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Avatar, Box, Dialog, Grid, IconButton, Paper } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import TutorSelectionView from 'src/views/studentviews/publications/tutorselection/tutorSelectionView';

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

const PublicationCard = (props) => {
  const { publication, isStudent} = props
  const classes = useStyles();
  const [watch, setWatch] = useState(false)
  const handleWatch = () => {
    setWatch(true)
  }
  const handleWatchClose = () => {
    setWatch(false)
  }
  let gridValue = 10
  if(isStudent){
    gridValue = 7
  }
  return (
    <Paper className={classes.paper} elevation={3}>
    <Card className={classes.root}>
      <Grid container >
        <Grid item xs={2}>
          <Box display='flex' flexDirection='column' alignItems='center' textAlign='center'>
            <Avatar className={classes.cover} alt='user photo' src='/static/images/avatars/avatar_6.png'/>
            {/*<Typography>
                {student.user.first_name} {student.user.last_name}
            </Typography>*/}
          </Box>
        </Grid>
        <Grid item xs={gridValue}>
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
        {isStudent? (
          <Grid className={classes.options} item xs={3}>
          <Box display='flex' flexDirection='column' alignItems='center' textAlign='center'>
            <Typography color="textSecondary">
               <b>Opciones</b>
            </Typography>
            <Box spacing={3}> 
                <IconButton color='primary' onClick={handleWatch}>
                    <VisibilityIcon/>
                </IconButton>
                <IconButton color='primary'>
                    <EditIcon />
                </IconButton>   
                <IconButton color='primary'>
                    <DeleteIcon />
                </IconButton>
            </Box>
            </Box>
            {watch? 
            (
              <Dialog 
                open={watch}
                onClose={handleWatchClose}    
                aria-labelledby='tutorSelection-dialog-title'>
                  <TutorSelectionView />
              </Dialog>
            )
            :
            (
              <></>
            )}
        </Grid>
        ):(<></>)}
      </Grid>
    </Card>
    </Paper>
  );
}

export default PublicationCard