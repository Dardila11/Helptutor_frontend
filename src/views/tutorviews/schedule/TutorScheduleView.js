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
import React from 'react'
import Page from 'src/components/Page'
import SaveIcon from '@material-ui/icons/Save'
import Schedule from 'src/components/Schedule/Schedule'

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
  const { saveSchedule, schedule } = props

  const handleSave = () => {
    saveSchedule(schedule)
  }

  return (
    <Page title="Horario">
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper className={classes.root} elevation={3}>
            <Card className={classes.root}>
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
        <Schedule role={"tutor"}/>
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
