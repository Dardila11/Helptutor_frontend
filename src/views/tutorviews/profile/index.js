import {
    Box,
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
  import TutorProfileView from './ProfileView'
  
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
  
  const TutorInfoView = () => {
    const classes = useStyles()
    return (
      <>
      <Page className={classes.root} title="Perfil">
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Paper className={classes.content} elevation={2}>
                <Card className={classes.content}>
                    <Typography
                    className={classes.containerTitle}
                    variant="h4"
                    align="center">
                    <b>Mi perfil</b>
                    </Typography>
                    <Container>
                    <Box textAlign="justify">
                        <Divider className={classes.divider} />
                        <Typography>
                         Este es tu perfil, cuando un estudiante desee contratar tus servicios esta es la información que verán. 
                        </Typography>
                    </Box>
                    </Container>                
                </Card>
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <TutorProfileView />
            </Grid>
        </Grid>
      </Page>
      </>
    )
  }
  
  export default TutorInfoView
  