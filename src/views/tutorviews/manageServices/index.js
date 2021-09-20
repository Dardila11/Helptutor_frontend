import React, {useState} from 'react'
import { CircularProgress, Grid, makeStyles } from '@material-ui/core'
import Page from 'src/components/Page'
import ServicesInfoView from './servicesInfo'
import ServicesListView from './servicesList'
import useTutorsServices from 'src/hooks/TutorHooks/useTutorServices'
import { useAuthState } from 'src/context'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark
  },
  progress: {
    marginTop: theme.spacing(5)
  }
}))

const ManageServicesView = () => {
  const classes = useStyles()
  const user = useAuthState().user
  const { data, isLoading} = useTutorsServices()
  const [service, setService] = useState(null)
  return (
    <>
      <Page className={classes.root} title="Gestionar areas de conocimiento">
        <Grid container spacing={2}>
          {isLoading? <CircularProgress /> :
          (
            <>
              <ServicesListView services={data} handleSelect={setService}/>
              {service!=null? 
                <ServicesInfoView service={service} user={user}/> 
                :
                <ServicesInfoView user={user}/>
              }
            </>
          )}
        </Grid>
      </Page>
    </>
  )
}

export default ManageServicesView
