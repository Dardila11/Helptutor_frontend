import React from 'react'
import { Avatar, Grid, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  coverAnswer: {
    width: 40,
    height: 40
  },
  answer: {
    marginBlockEnd: theme.spacing(2)
  }
}))

const AnswerCard = ({ answer }) => {
  const classes = useStyles()
  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={1}>
          <Avatar
            className={classes.coverAnswer}
            alt="user photo"
            src={answer.user.photo}
          />
        </Grid>
        <Grid className={classes.answer} item xs={11}>
          <Typography component="h6" lineheight={1} variant="h6">
            <b>
              {answer.user.first_name}{' '}
              {answer.user.last_name}
            </b>
          </Typography>
          <Typography component="h6" variant="h6">{answer.description}</Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default AnswerCard
