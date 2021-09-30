import React, { useState } from 'react'

// CONTEXT
import { useAuthState } from 'src/context'

// QUERY
import useTutorKnowledgeAreas from 'src/hooks/TutorHooks/useTutorKnowledgeArea'

// COMPONENT
import Page from 'src/components/Page'

// VIEW
import KnowledgeAreaInfoView from './knowledgeAreaInfo'
import KnowledgeAreaListView from './knowledgeAreaList'

// STYLES
import { CircularProgress, Grid, makeStyles } from '@material-ui/core'

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

  const { user } = useAuthState()
  const { data, isLoading } = useTutorKnowledgeAreas(user.id)
  const [areaSelect, setAreaSelect] = useState(null)

  return (
    <Page className={classes.root} title="Gestionar areas de conocimiento">
      <Grid container spacing={2}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <KnowledgeAreaListView handleSelect={setAreaSelect} list={data} />
            <KnowledgeAreaInfoView area={areaSelect} />
          </>
        )}
      </Grid>
    </Page>
  )
}

export default ManageKnowledgeAreaView
