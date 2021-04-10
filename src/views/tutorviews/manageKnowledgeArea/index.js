import React from 'react'
import {


  Grid,
  makeStyles
} from '@material-ui/core'
import Page from 'src/components/Page'
import KnowledgeAreaInfoView from './knowledgeAreaInfo'
import KnowledgeAreaListView from './knowledgeAreaList'

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
