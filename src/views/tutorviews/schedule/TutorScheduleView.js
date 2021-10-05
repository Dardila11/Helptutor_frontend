import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core'
import React, { useState} from 'react'
import Page from 'src/components/Page'
import SaveIcon from '@material-ui/icons/Save'
import Schedule from 'src/components/Schedule/Schedule'
import useSchedule from 'src/hooks/TutorHooks/useSchedule'
import { useAuthState } from 'src/context'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import { useNavigate } from 'react-router'

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '20px'
  },
  containerTitle: {
    marginTop: theme.spacing(2),
    marginBlockEnd: theme.spacing(2)
  },
  actions: {
    marginTop: theme.spacing(2),
    marginBlockEnd: theme.spacing(2)
  },
  button: {
    textTransform: 'none'
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))

const TutorScheduleView = (props) => {
  const classes = useStyles()
  const id = useAuthState().user.id
  const [schedule, setSchedule] = useState(null)
  const { useCreateTutorSchedule } = useSchedule
  const mutation = useCreateTutorSchedule()
  const navigate = useNavigate()

  const handleSave = () => {
    let formated = []
    schedule.forEach(element => {
      let month = ((element.day.getMonth()+1)+"").length === 1? "0"+(element.day.getMonth()+1): (element.day.getMonth()+1)
      let day = ((element.day.getDate())+"").length === 1? "0"+(element.day.getDate()): (element.day.getDate())
      let slot = {
        day: element.day.getFullYear()+"-"+month+"-"+day,
        start_time: (element.start_time+"").length === 1? "0"+element.start_time+":00:00": element.start_time+":00:00",
        end_time: (element.end_time+"").length === 1? "0"+element.end_time+":00:00": element.end_time+":00:00",
      }
      formated.push(slot)
    });
    mutation.mutate({time_slots : formated})
  }
  

  const handleSchedule = data => {
    setSchedule(data)
  }

  return (
    <Page title="Horario">
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper className={classes.root} elevation={3}>
            <Card className={classes.root}>
              <Container className={classes.actions}>
                <Button
                  className={classes.button}
                  fullWidth={true}
                  color="secundary"
                  variant="contained"
                  startIcon={<ArrowBackIos />}
                  onClick={() => navigate('/tutor/cuenta')}>
                  Menú
                </Button>
              </Container>
              <Typography
                className={classes.containerTitle}
                variant="h4"
                align="center">
                Mi horario
              </Typography>
              <Container>
                <Box textAlign="justify">
                  <Typography align="center">
                    <b>Fecha actual {getDate()}</b>
                  </Typography>
                  <Divider className={classes.divider} />
                  <Typography>
                    Selecciona las franjas de tiempo que tienes disponibles para
                    dictar tus clases en la semana
                  </Typography>
                </Box>
              </Container>
              <Container className={classes.actions}>
                <Button
                  className={classes.button}
                  fullWidth
                  color="primary"
                  variant="contained"
                  endIcon={<SaveIcon />}
                  onClick={handleSave}>
                  Guardar horario
                </Button>
              </Container>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Schedule role={"tutor"} handleTutor={handleSchedule} idTutor={id}/>
        </Grid>
      </Grid>
    </Page>
  )
}

function getDate() {
  var today = new Date()
  var dd = String(today.getDate()).padStart(2, '0')
  var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
  var yyyy = today.getFullYear()

  today = dd + '/' + mm + '/' + yyyy
  return today
}

export default TutorScheduleView
