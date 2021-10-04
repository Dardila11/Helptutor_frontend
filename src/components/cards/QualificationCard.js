import React from 'react'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  makeStyles,
  Typography
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import studentInfo from 'src/views/studentviews/studentInfo'
import { useReviews } from 'src/hooks/TutorHooks/useReviews'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '4px'
  },
  content: {
    paddingBottom: '0px'
  },
  cover: {
    width: 30,
    height: 30
  }
}))

const QualificationCard = (props) => {
  const classes = useStyles()
  const { review } = props
  return (
    <Card className={classes.root} elevation={3}>
      <CardContent className={classes.root}>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Avatar
            className={classes.cover}
            alt="user photo"
            src={review.student.user.photo}>
            <b>{review.student.user.first_name[0]}</b>
          </Avatar>
          <Box>
            <Typography variant="h6">
              <b>
                {review.student.user.first_name} {review.student.user.last_name}
              </b>
            </Typography>
            <Rating value={review.score} size="small" readOnly />
          </Box>
        </Box>
        <Box textAlign="justify">
          <Typography variant="h6">{review.comment}</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default QualificationCard
