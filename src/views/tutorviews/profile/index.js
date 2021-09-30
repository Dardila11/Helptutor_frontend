import React from 'react'

// COMPONENT
import Page from 'src/components/Page'
import TutorProfileView from './ProfileView'

// STYLES
import {
  Box,
  Card,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core'

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
  information: {
    padding: theme.spacing(2)
  }
}))

const TutorInfoView = (props) => {
  const classes = useStyles()
  const { menu } = props

  return (
    <Page className={classes.root} title="Perfil">
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          {menu}
        </Grid>
        <Grid item xs={12} md={2}>
          <Paper className={classes.content} elevation={2}>
            <Card className={classes.content}>
              <Typography
                className={classes.containerTitle}
                variant="h4"
                align="center">
                <b>Mi perfil</b>
              </Typography>
              <Container>
                <Box textAlign="justify" className={classes.information}>
                  <Typography>
                    Este es tu perfil, cuando un estudiante desee contratar tus
                    servicios esta es la información que verán.
                  </Typography>
                </Box>
              </Container>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={12} md={7}>
          <TutorProfileView />
        </Grid>
      </Grid>
    </Page>
  )
}

export default TutorInfoView
