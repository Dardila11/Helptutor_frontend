import React from 'react'
import {
  Avatar,
  Box,
  Card,
  Divider,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core'

import { Rating } from '@material-ui/lab'
import QualificationCard from 'src/components/cards/QualificationCard'
import { capitalize } from 'lodash-es'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '800px',
    padding: '20px',
    borderRadius: '20px'
  },
  title: {
    margin: theme.spacing(2)
  },
  cover: {
    width: 140,
    height: 140,
    margin: theme.spacing(2)
  },
  principalInformation: {
    margin: theme.spacing(2)
  },
  contentPrincipal: {
    margin: theme.spacing(1)
  },
  secondInformation: {
    margin: theme.spacing(1)
  },
  divider: {
    margin: theme.spacing(2)
  },
  nextButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing(1)
  },
  ratings: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }
}))

const ProfileView = ({ tutor, reviews }) => {
  const classes = useStyles()
  return (
    <>
      <Card className={classes.root}>
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Box className={classes.title} textAlign="center">
            <Typography variant="h3">
              <b>
                {capitalize(tutor.user.first_name)}{' '}
                {capitalize(tutor.user.last_name)}
              </b>
            </Typography>
            <Typography variant="h4">Tutor</Typography>
          </Box>
          <Divider />
          <Grid container>
            <Grid item xs={8}>
              <Box
                className={classes.principalInformation}
                display="flex"
                flexDirection="column">
                <Typography className={classes.contentPrincipal} variant="h4">
                  {getAge(tutor.user.birthday)} años
                </Typography>
                <Typography className={classes.contentPrincipal} variant="h4">
                  {tutor.skills}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box className={classes.ratings}>
                <Avatar
                  className={classes.cover}
                  alt="user photo"
                  src={tutor.user.photo}
                />
                <Rating value={tutor.score} size="large" readOnly />
                <Typography className={classes.contentPrincipal} variant="h4">
                  Promedio: {tutor.score} de {tutor.score_average} calificaciones
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Divider />
          <Box display="flex" flexDirection="row">
            <Box className={classes.secondInformation}>
              <Box textAlign="center">
                <Typography variant="h4">
                  <b>Metodologia</b>
                </Typography>
              </Box>
              <Box>
                <Typography align="justify">{tutor.methodology}</Typography>
              </Box>
              {tutor.trajectory === '' ? (
                <></>
              ) : (
                <>
                  <Box textAlign="center">
                    <Typography variant="h4">
                      <b>Experiencia</b>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography align="justify">{tutor.trajectory}</Typography>
                  </Box>
                </>
              )}
            </Box>
            <Box className={classes.divider}>
              <Divider orientation="vertical" />
            </Box>
            <Box className={classes.qualifications}>
              <Box textAlign="center">
                <Typography variant="h4">
                  <b>Reseñas</b>
                </Typography>
              </Box>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <QualificationCard key={index} review={review} />
                ))
              ) : (
                <Typography component="span" variant="h6">
                  No tiene reseñas
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Card>
    </>
  )
}

function getAge(fecha) {
  var hoy = new Date()
  var cumpleanos = new Date(fecha)
  var edad = hoy.getFullYear() - cumpleanos.getFullYear()
  var m = hoy.getMonth() - cumpleanos.getMonth()

  if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
    edad--
  }

  return edad
}

export default ProfileView
