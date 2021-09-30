import React, { useState } from 'react'
import { CircularProgress, Grid, makeStyles } from '@material-ui/core'
import Page from 'src/components/Page'
import ServicesInfoView from './servicesInfo'
import ServicesListView from './servicesList'
import useTutorServices from 'src/hooks/TutorHooks/useTutorServices'
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
  const { user } = useAuthState()
  console.log('manageservice', user)
  const { data, isLoading } = useTutorServices.useTutorServices(user.id)
  const [service, setService] = useState(null)
  return (
    <>
      <Page className={classes.root} title="Gestionar areas de conocimiento">
        <Grid container spacing={2}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <ServicesListView services={data} handleSelect={setService} />
              <ServicesInfoView service={service} user={user} />
            </>
          )}
        </Grid>
      </Page>
    </>
  )
}

export default ManageServicesView
