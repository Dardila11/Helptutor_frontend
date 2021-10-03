import React from 'react'

// QUERY
import useTutorInfo from 'src/hooks/TutorHooks/useTutorInfo'

// CONTEXT
import { useAuthState } from 'src/context/context'

// COMPONENT
import QualificationCard from 'src/components/cards/QualificationCard'
import ProfileViewSkeleton from 'src/components/skeletons/ProfileViewSkeleton'

// STYLES
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
import useReviews from 'src/hooks/TutorHooks/useReview'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2)
  },
  cover: {
    width: 140,
    height: 140,
    margin: theme.spacing(2),
    color: theme.palette.getContrastText('#1769aa'),
    backgroundColor: '#1769aa'
  },
  main: {
    padding: theme.spacing(2)
  },
  principal: {
    padding: theme.spacing(1)
  },
  information: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row'
  },
  divider: {
    padding: theme.spacing(1)
  },
  review: {
    height: '200px',
    overflowY: 'auto'
  }
}))

const TutorProfileView = () => {
  const classes = useStyles()
  const user = useAuthState().user
  const { data: tutor, isLoading } = useTutorInfo(user.id)
  const { data: reviews, isLoading: isLoading1 } = useReviews(user.id)

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <Card className={classes.root}>
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Box className={classes.title} textAlign="center">
          <Typography variant="h3">
            <b>
              {tutor.user.first_name} {tutor.user.last_name}
            </b>
          </Typography>
          <Typography variant="h4">Tutor</Typography>
        </Box>
        <Divider />
        <Grid container>
          <Grid item xs={8}>
            <Box className={classes.main} display="flex" flexDirection="column">
              <Typography className={classes.principal} variant="h4">
                {tutor.user.birthday ? getAge(tutor.user.birthday) : ''} años
              </Typography>
              <Typography className={classes.principal} variant="h4">
                {tutor.skills}
              </Typography>
              <Rating value={tutor.score_average} size="large" readOnly />
              <Typography className={classes.principal} variant="h4">
                Promedio: {tutor.score_average} de {tutor.score_count}{' '}
                calificaciones
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" justifyContent="center">
              <Avatar
                className={classes.cover}
                alt="user photo"
                src={tutor.user.photo}>
                <Typography variant="h1">
                  <b>{tutor.user.first_name[0]}</b>
                </Typography>
              </Avatar>
            </Box>
          </Grid>
        </Grid>
        <Divider />
        <Box>
          <Grid container className={classes.information}>
            <Grid item xs={4}>
              <Box>
                <Typography variant="h5">
                  <b>Intereses</b>
                </Typography>
              </Box>
              <Box>
                <Typography align="justify">
                  {tutor.user.interest
                    ? tutor.user.interest
                    : 'No hay intereses'}
                </Typography>
              </Box>
              <Box className={classes.divider}>
                <Divider />
              </Box>
              <Box>
                <Typography variant="h5">
                  <b>Metodologia</b>
                </Typography>
              </Box>
              <Box>
                <Typography align="justify">
                  {tutor.methodology ? tutor.methodology : 'No hay metodologia'}
                </Typography>
              </Box>
              <Box className={classes.divider}>
                <Divider />
              </Box>
              <Box>
                <Typography variant="h5">
                  <b>Experiencia</b>
                </Typography>
              </Box>
              <Box>
                <Typography align="justify">
                  {tutor.trajectory ? tutor.trajectory : 'No hay trayectoria'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={1} className={classes.divider}>
              <Divider orientation="vertical" />
            </Grid>
            <Grid item xs={6}>
              <Box textAlign="center">
                <Typography variant="h4">
                  <b>Reseñas</b>
                </Typography>
              </Box>
              <Box className={classes.review}>
                {isLoading1 ? (
                  <span>Loading... </span>
                ) : reviews.length > 0 ? (
                  reviews.map((item, key) => (
                    <QualificationCard key={key} review={item} />
                  ))
                ) : (
                  <span>No se encontraron reseñas</span>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Card>
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

export default TutorProfileView
