import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function TutorCard(props) {
  const {tutor} = props
  const classes = useStyles();
  console.log(tutor)

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {tutor.user.first_name} {tutor.user.last_name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {tutor.skills}
          </Typography>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        image="/static/images/avatars/avatar_6.png"
        title="Live from space album cover"
      />
    </Card>
  );
}