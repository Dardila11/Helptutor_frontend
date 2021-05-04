import React, { useEffect } from 'react'
import { Avatar, Box, Card, Divider, Grid, makeStyles, Typography } from '@material-ui/core'

import { getTutorInfo } from 'src/redux/actions/tutor/tutor_data'
import { connect } from 'react-redux'
import { isUndefined } from 'lodash-es'
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
    margin: theme.spacing(2)
  },
  principalInformation: {
    margin: theme.spacing(2)
  },
  contentPrincipal:{
    margin: theme.spacing(1)
  },
  secondInformation: {
    margin: theme.spacing(2)
  },
  contentSecondary: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2)
  }
}))

const ProfileView = (props) => {
  const classes = useStyles()
  const {user, getTutorInfo, idTutor, tutor} = props
  let id = null
  if(isUndefined(idTutor))id=user.id
  else id=idTutor

  useEffect(
    () => {
      getTutorInfo(id)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  return (
    <Card className={classes.root}>
      <Box display="flex" flexDirection="column" justifyContent="center" >
          <Box className={classes.title} textAlign='center'>
              <Typography variant='h3'>
                <b>{tutor.first_name} {tutor.last_name}</b>
              </Typography>
              <Typography variant='h4'>
                Tutor
              </Typography>
          </Box>
          <Divider/>
          <Grid container>
            <Grid item xs={8}>
              <Box className={classes.principalInformation} display='flex' flexDirection='column'>
                <Typography className={classes.contentPrincipal} variant='h4'>
                  {getAge(tutor.birthday)} años
                </Typography>
                <Typography  className={classes.contentPrincipal}variant='h4'>
                  {tutor.skills}
                </Typography>
                <Rating value={4} size='large' readOnly/>
                <Typography className={classes.contentPrincipal} variant='h4'>
                  4/5, 23 calificaciones
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box display='flex' justifyContent='center'>
                <Avatar className={classes.cover} alt="user photo" src="/static/images/avatars/avatar_6.png"/>
              </Box>
            </Grid>
          </Grid>
          <Divider/>
          <Grid className={classes.secondInformation} container>
            <Grid item xs={6}>
              <Box textAlign='center'>
                <Typography variant='h4'>
                  <b>Metodologia</b>
                </Typography>
                </Box>
                <Box className={classes.contentSecondary}>
                  <Typography align='justify'>
                    {tutor.methodology}
                  </Typography>
                </Box>
                <Box textAlign='center'>
                <Typography variant='h4'>
                  <b>Experiencia</b>
                </Typography>
                </Box>
                <Box className={classes.contentSecondary}>
                  <Typography align='justify'>
                    {tutor.trajectory}
                  </Typography>
                </Box>
            </Grid>
            <Grid item xs={1}>
              <Divider orientation='vertical' />
            </Grid>            
            <Grid item xs={5}>
              <Box textAlign='center'>
                <Typography variant='h4'>
                  <b>Reseñas</b>
                </Typography>
              </Box>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, quod vel et, reprehenderit voluptatum inventore at ipsa dicta possimus veritatis incidunt voluptatibus id molestias recusandae magni, quis suscipit magnam ipsam?
                </Typography>
            </Grid>
          </Grid>
      </Box>
    </Card>
  )
}

function getAge(fecha) {
  var hoy = new Date();
  var cumpleanos = new Date(fecha);
  var edad = hoy.getFullYear() - cumpleanos.getFullYear();
  var m = hoy.getMonth() - cumpleanos.getMonth();

  if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
  }

  return edad;
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  tutor: state.tutorInfo.userInfo
})

export default connect(mapStateToProps, {
  getTutorInfo
})(ProfileView)
