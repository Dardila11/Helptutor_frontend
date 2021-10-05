import React from 'react'
import {
  Avatar,
  Box,
  DialogTitle,
  Grid,
  makeStyles,
  Typography,
  IconButton,
  DialogContent
} from '@material-ui/core'
import AnswerFormView from './answerForm'

import AnswerCard from 'src/components/cards/answerCard'
import CloseIcon from '@material-ui/icons/Close'
import AdvertisementInfoViewSkeleton from 'src/components/skeletons/AdvertisementInfoViewSkeleton'

import { useStudentInfo } from 'src/hooks/StudentHooks/useStudentInfo'
import { useAdvertisementAnswers } from 'src/hooks/useAdvertisements'
import { capitalize } from 'lodash-es'

const useStyles = makeStyles((theme) => ({
  cover: {
    width: 70,
    height: 70
  },
  answersTitle: {
    marginBlock: theme.spacing(1)
  },
  answers: {
    marginLeft: theme.spacing(2)
  },
  content: {
    marginTop: '0px',
    margin: theme.spacing(2)
  }
}))

const AnswerView = (props) => {
  const classes = useStyles()
  const studentInfoQuery = useStudentInfo(props.advertisement.student.user.id)
  const advertisementAnswersQuery = useAdvertisementAnswers(
    props.advertisement.id
  )
  console.log(advertisementAnswersQuery)

  return (
    <>
      {advertisementAnswersQuery.status === 'success' &&
      studentInfoQuery.status === 'success' ? (
        <>
          <DialogTitle id="publications-dialog-title" align="center">
            <Box display="flex" alignItems="center">
              <Box flexGrow={1}>
                <Typography component={'span'} variant="h3">
                  Anuncio
                </Typography>
              </Box>
              <IconButton onClick={props.onClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent dividers>
            <Box className={classes.content}>
              <Grid container>
                <Grid item xs={2}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    textAlign="center">
                    <Avatar
                      className={classes.cover}
                      alt="user photo"
                      src={studentInfoQuery.data.user.photo}
                    />
                    <Typography variant="h6">
                      <b>
                        {capitalize(studentInfoQuery.data.user.first_name)}{' '}
                        {capitalize(studentInfoQuery.data.user.last_name)}
                      </b>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={10}>
                  <Typography>
                    <b>{props.advertisement.title}</b>
                  </Typography>
                  <Typography>{props.advertisement.description}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <AnswerFormView advertisement={props.advertisement} />
                </Grid>
                {advertisementAnswersQuery.data.length > 0 ? (
                  <>
                    <Grid className={classes.answersTitle} item xs={12}>
                      <Typography variant="h6">Respuestas</Typography>
                    </Grid>
                    <Grid className={classes.answers} container>
                      {advertisementAnswersQuery.data.map((answer, index) => (
                        <AnswerCard
                          id={answer.id}
                          key={index}
                          answer={answer}
                        />
                      ))}
                    </Grid>
                  </>
                ) : (
                  <></>
                )}
              </Grid>
            </Box>
          </DialogContent>
        </>
      ) : (
        <AdvertisementInfoViewSkeleton />
      )}
    </>
  )
}

export default AnswerView
