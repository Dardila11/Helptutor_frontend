import React from 'react'
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
import Page from 'src/components/Page'
import EditInfoView from './tutorInfo/EditInfoView'

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
  return (
    <Page className={classes.root} title="Editar perfil">
      <EditInfoView />
    </Page>
  )
}

export default TutorEditInfoView
