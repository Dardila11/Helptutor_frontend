import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import {
  Avatar,
  Box,
  CardActionArea,
  Container,
  Grid,
  Paper
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { capitalize } from 'lodash-es'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    borderRadius: '20px',
    height: 200,
    width: 250
  },
  userSpace: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: 40,
    height: 40
  },
  paper: {
    borderRadius: '20px',
    margin: theme.spacing(1)
  },
  methodology: {
    marginTop: theme.spacing(1)
  },
  price: {
    color: '#1ad41a',
    marginTop: theme.spacing(2),
    textAlign: 'center'
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
      <Card className={classes.root}>
        <CardActionArea className={classes.cardAction} onClick={handleSelect}>
          <Grid container>
            <Grid item xs={6}>
              <Box className={classes.userSpace}>
                <Avatar
                  className={classes.cover}
                  alt="user photo"
                  src={props.tutor.user.photo}
                />
                <Typography component={'h5'} variant="h5">
                  <b>{capitalize(props.tutor.user.first_name)} {capitalize(props.tutor.user.last_name)}</b>
                </Typography>
                <Rating name="read-only" size="small" value={props.tutor.score} readOnly />
              </Box>
            </Grid>
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
                <Typography component={'span'} color="textSecondary" variant="h5">
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
