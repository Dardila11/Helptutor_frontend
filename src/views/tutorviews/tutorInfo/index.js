import React from 'react'
import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Button
} from '@material-ui/core'
import Page from 'src/components/Page'
import EditInfoView from './tutorInfo/EditInfoView'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import { useNavigate } from 'react-router'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark
  },
  content: {
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

const TutorEditInfoView = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  return (
    <Page className={classes.root} title="Editar perfil">
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Paper className={classes.content} elevation={3}>
            <Card className={classes.content}>
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
                Mi información
              </Typography>
              <Container>
                <Box textAlign="justify">
                  <Divider className={classes.divider} />
                  <Typography>
                    Actualiza tu información personal, recuerda que esta
                    información es tu carta de presentación para los estudiantes
                  </Typography>
                </Box>
              </Container>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <EditInfoView />
        </Grid>
      </Grid>
    </Page>
  )
}

export default TutorEditInfoView
