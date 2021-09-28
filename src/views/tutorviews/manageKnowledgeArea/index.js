import React, {useState} from 'react'
import { CircularProgress, Grid, makeStyles } from '@material-ui/core'
import Page from 'src/components/Page'
import KnowledgeAreaInfoView from './knowledgeAreaInfo'
import KnowledgeAreaListView from './knowledgeAreaList'
import { useAuthState } from 'src/context'
import useTutorKnowledgeAreas from 'src/hooks/TutorHooks/useTutorKnowledgeArea'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark
  },
  progress: {
    marginTop: theme.spacing(5)
  }
}))

const ManageKnowledgeAreaView = () => {
  const user = useAuthState().user
  const { data, isLoading } = useTutorKnowledgeAreas(user.id)
  const classes = useStyles()
  const [areaSelect, setAreaSelect] = useState(null)
  return (
    <>
      <Page className={classes.root} title="Gestionar areas de conocimiento">
        <Grid container spacing={2}>
          {isLoading? (<CircularProgress />):(
            <>
              <KnowledgeAreaListView handleSelect={setAreaSelect} specialities_tutor={data}/>
              {areaSelect === null? (
                <KnowledgeAreaInfoView />
              ):(
                <KnowledgeAreaInfoView area={areaSelect} user={user}/>
              )}
            </>
          )}          
        </Grid>
      </Page>
    </>
  )
}

export default ManageKnowledgeAreaView
