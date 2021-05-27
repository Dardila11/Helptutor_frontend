import React, { useEffect } from 'react'
import { Box, makeStyles, Paper, Typography } from '@material-ui/core'

import { getServices } from 'src/redux/actions/student/student_services'
import { connect } from 'react-redux'
import PublicationsViewSkeleton from 'src/components/skeletons/PublicationsViewSkeleton'
import SearchBar from 'src/components/SearchBar'
import TutorServiceCard from 'src/components/tutorServiceCard'
import Page from 'src/components/Page'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    borderRadius: '20px',
    width: 900,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  cardsContent: {
    margin: theme.spacing(2),
    borderRadius: '20px'
  },
  title: {
    margin: theme.spacing(1)
  }
}))

const TutorsView = (props) => {
  const classes = useStyles()
  const { loading, services, getServices } = props

  useEffect(
    () => {
      getServices()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  return (
    <Page title="Tutores">
      <Box display='flex' flexDirection='row' justifyContent='center'>
        <Box>
          <SearchBar />
        </Box>
        <Box>
          <Paper elevation={3} className={classes.root}>
            {loading ? (
              <PublicationsViewSkeleton />
            ) : (
              <>
                <Box className={classes.title} textAlign="center">
                  <Typography variant="h4">Selecciona una asesoria</Typography>
                </Box>
                <Box>
                  {services.map((service, index) => (
                    <TutorServiceCard
                      key={index}
                      id={service.id}
                      service={service}
                    />
                  ))}
                </Box>
              </>
            )}
          </Paper>
        </Box>
      </Box>
    </Page>
  )
}

const mapStateToProps = (state) => ({
  services: state.studentServices.services,
  loading: state.studentServices.loading
})

export default connect(mapStateToProps, {
  getServices
})(TutorsView)
