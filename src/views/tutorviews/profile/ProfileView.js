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
    margin: theme.spacing(2),
    color: theme.palette.getContrastText('#1769aa'),
    backgroundColor: '#1769aa'
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
    margin: theme.spacing(1)
  }
}))

const TutorProfileView = () => {
  const classes = useStyles()
  const user = useAuthState().user
  const { data, isLoading } = useTutorInfo(user.id)
  const tutor = data

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
            <Box
              className={classes.principalInformation}
              display="flex"
              flexDirection="column">
              <Typography className={classes.contentPrincipal} variant="h4">
                {tutor.user.birthday ? getAge(tutor.user.birthday) : ''} años
              </Typography>
              <Typography className={classes.contentPrincipal} variant="h4">
                {tutor.skills}
              </Typography>
              <Rating value={tutor.score} size="large" readOnly />
              <Typography className={classes.contentPrincipal} variant="h4">
                Promedio: 4.5 de 23 calificaciones
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
        <Box display="flex" flexDirection="row">
          <Box className={classes.secondInformation}>
            <Box textAlign="center">
              <Typography variant="h4">
                <b>Intereses</b>
              </Typography>
            </Box>
            <Box>
              <Typography align="justify">
                {tutor.user.interest ? tutor.user.interest : ''}
              </Typography>
            </Box>
            <Box className={classes.divider}>
              <Divider />
            </Box>
            <Box textAlign="center">
              <Typography variant="h4">
                <b>Metodologia</b>
              </Typography>
            </Box>
            <Box>
              <Typography align="justify">
                {tutor.methodology ? tutor.methodology : ''}
              </Typography>
            </Box>
            <Box className={classes.divider}>
              <Divider />
            </Box>
            <Box textAlign="center">
              <Typography variant="h4">
                <b>Experiencia</b>
              </Typography>
            </Box>
            <Box>
              <Typography align="justify">
                {tutor.trajectory ? tutor.trajectory : ''}
              </Typography>
            </Box>
          </Box>
          <Box className={classes.divider}>
            <Divider orientation="vertical" />
          </Box>
          <Box>
            <Box textAlign="center">
              <Typography variant="h4">
                <b>Reseñas</b>
              </Typography>
            </Box>
            <QualificationCard />
            <QualificationCard />
          </Box>
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
