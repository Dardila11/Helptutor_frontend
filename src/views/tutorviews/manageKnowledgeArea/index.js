import React, { useEffect, useState } from 'react'
import {
  LinearProgress,
  CircularProgress,
  Grid,
  makeStyles
} from '@material-ui/core'
import Page from '../../../components/Page'
import KnowledgeAreaInfoView from './knowledgeAreaInfo'
import KnowledgeAreaListView from './knowledgeAreaList'
import Api from '../../../services/Api'

import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark
  },
  progress: {
    marginTop: theme.spacing(5)
  }
}))

const ManageKnowledgeAreaView = () => {
  const classes = useStyles()

  return (
    <>
      <Page className={classes.root} title="Gestionar areas de conocimiento">
        <Grid container spacing={2}>
              <KnowledgeAreaListView />
              <KnowledgeAreaInfoView />
        </Grid>
      </Page>
    </>
  )
}

export default ManageKnowledgeAreaView
