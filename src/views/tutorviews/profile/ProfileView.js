import React, {useEffect} from 'react'
import { Avatar, Box, Card, Divider, Grid, makeStyles, Typography } from '@material-ui/core'

import { getTutorInfo } from 'src/redux/actions/tutor/tutor_data'
import { connect } from 'react-redux'
import { Rating } from '@material-ui/lab'
import QualificationCard from 'src/components/QualificationCard'

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
  contentPrincipal:{
    margin: theme.spacing(1)
  },
  secondInformation: {
    margin: theme.spacing(1)
  },
  divider: {
    margin: theme.spacing(1)
  }
}))

const TutorProfileView = (props) => {
  const classes = useStyles()
  const {user, getTutorInfo, tutor} = props

  useEffect(
    () => {
      getTutorInfo(user.id)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  console.log(tutor)
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
                  Promedio: 4.5 de 23 calificaciones
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box display='flex' justifyContent='center'>
                <Avatar className={classes.cover} alt="user photo" src={tutor.photo}>
                  <Typography variant='h1'>
                    <b>{tutor.first_name[0]}</b>
                  </Typography>
                </Avatar>
              </Box>
            </Grid>
          </Grid>
          <Divider/>
          <Box display='flex' flexDirection='row'>
            <Box className={classes.secondInformation}>
            <Box textAlign='center'>
                <Typography variant='h4'>
                  <b>Intereses</b>
                </Typography>
              </Box>
              <Box >
                  <Typography align='justify'>
                    {tutor.interest}
                  </Typography>
              </Box>
              <Box className={classes.divider}>
              <Divider />
              </Box>
              <Box textAlign='center'>
                <Typography variant='h4'>
                  <b>Metodologia</b>
                </Typography>
              </Box>
              <Box >
                  <Typography align='justify'>
                    {tutor.methodology}
                  </Typography>
              </Box>
              <Box className={classes.divider}>
              <Divider />
            </Box>
              <Box textAlign='center'>
                <Typography variant='h4'>
                  <b>Experiencia</b>
                </Typography>
              </Box>
              <Box>
                  <Typography align='justify'>
                    {tutor.trajectory}
                  </Typography>
              </Box>  
            </Box>          
            <Box className={classes.divider}>
              <Divider orientation='vertical'/>
            </Box>
            <Box >
              <Box textAlign='center'>
                <Typography variant='h4'>
                  <b>Reseñas</b>
                </Typography>
              </Box>
                <QualificationCard/>
                <QualificationCard/>
            </Box>
          </Box>
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
  getTutorInfo,
})(TutorProfileView)
