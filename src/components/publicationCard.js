import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Avatar, Box, Button, Grid, Paper } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';

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
    width: 60,
    height: 60
  },
  paper: {
    borderRadius: '20px',
    border: theme.spacing(2)
  },
  options: {
      borderTop: theme.spacing(2)
  }
}));

const PublicationCard = (props) => {
  const { publication } = props
  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={3}>
    <Card className={classes.root}>
      <Grid container >
        <Grid item xs={2}>
          <Avatar className={classes.cover} alt='user photo' src='/static/images/avatars/avatar_6.png'/>
        </Grid>
        <Grid item xs={7}>
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
        <Grid className={classes.options} item xs={3}>
            <Typography color="textSecondary">
               <Box textAlign='center' fontWeight={500}>
                  Opciones
               </Box>
            </Typography>
            <Box spacing={3}> 
                <Button>
                    <VisibilityIcon/>
                </Button>
                <Button>
                    <EditIcon />
                </Button>   
                <Button>
                    <DeleteIcon />
                </Button>
            </Box>
        </Grid>
      </Grid>
    </Card>
    </Paper>
  );
}

export default PublicationCard