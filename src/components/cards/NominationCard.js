import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  Container,
  Grid,
  Paper
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: '20px',
    margin: theme.spacing(1)
  },
  root: {
    display: 'flex',
    borderRadius: '20px',
  },
  cardAction: {
    borderRadius: '20px',
    minHeight: 200,
    minWidth: 288,
    maxWidth: 288,
    maxHeight: 200
  },
  userSpace: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  content: {
    flex: '1 0 auto',
    minHeight: 100
  },
  cover: {
    width: 40,
    height: 40
  },
  price: {
    color: '#1ad41a',
    marginTop: theme.spacing(2),
    textAlign: 'center'
  },
  gridContainer : {
    margin: '10px'
  }
}))

const NominationCard = (props) => {
  const { nomination, next } = props
  const classes = useStyles()

  const handleSelect = () => {
    next(nomination)
  }
  return (
    <Paper className={classes.paper} elevation={3}>
      <Card className={classes.cardAction}>
        <CardActionArea onClick={handleSelect}>
          <Grid className={classes.gridContainer} container>
            {/* Avatar, name and rating */}
            <Grid item xs={6}>
              <Box className={classes.userSpace}>
                <Avatar
                  className={classes.cover}
                  alt="user photo"
                  src={props.tutor.user.photo}
                />
                <Typography component={'h5'} variant="h5">
                  <b>{props.tutor.user.first_name} {props.tutor.user.last_name}</b>
                </Typography>
                <Rating name="read-only" size="small" value={props.tutor.score} readOnly />
              </Box>
            </Grid>
            {/* Price */}
            <Grid item xs={2}>
              <Container className={classes.price}>
                <Typography component={'h6'} variant="subtitle1" color="textSecondary">
                  <b>Costo</b>
                </Typography>
                <Typography component={'span'} variant="h5">${nomination.price}</Typography>
              </Container>
            </Grid>
            <Grid item xs={12}>
              <CardContent className={classes.content}>
                <Typography component={'span'} color="textSecondary" variant="h6">
                  {nomination.description}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
    </Paper>
  )
}

export default NominationCard
