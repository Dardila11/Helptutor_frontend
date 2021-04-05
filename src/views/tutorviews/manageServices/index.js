import React, { useEffect, useState } from 'react'
import {
  LinearProgress,
  CircularProgress,
  Grid,
  makeStyles
} from '@material-ui/core'
import Page from '../../../components/Page'
import ServicesInfoView from './servicesInfo'
import ServicesListView from './servicesList'
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

const ManageServicesView = (props) => {
  const classes = useStyles()
  /*
  useEffect(() => {
    const fetchData = async () => {
      await Api.getTutorKnowledgeAreas(props.user.id).then((res) => {
        setKnowledgeAreas(res.data)
        setloading(true)
      })
    }
    fetchData()
  }, [])*/
  return (
    <>
      <Page className={classes.root} title="Gestionar areas de conocimiento">
        <Grid container spacing={2}>
            <>
              <ServicesListView />
              <ServicesInfoView />
            </>
        </Grid>
      </Page>
    </>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

export default connect(mapStateToProps, {})(ManageServicesView)
