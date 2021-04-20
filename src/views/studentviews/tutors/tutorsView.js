import React, { useEffect } from 'react'
import { Box, makeStyles, Paper, Typography } from '@material-ui/core'

import { getTutors } from 'src/redux/actions/tutors_data'
import { connect } from 'react-redux'
import PublicationsViewSkeleton from 'src/components/skeletons/PublicationsViewSkeleton'
import SearchBar from 'src/components/SearchBar'
import TutorCard from 'src/components/tutorCard'
import Page from 'src/components/Page'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    borderRadius: '20px',
    width: 900
  },
  cardsContent: {
      margin: theme.spacing(2),
      borderRadius:'20px'
  },
  title:{
      margin: theme.spacing(1)
  }
}))

const TutorsView = (props) => {
  const classes = useStyles()
  const {loading, tutors, getTutors} = props

  useEffect(() => {
        getTutors()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [])   

  return (
    <Page title='Tutores'>
      <Box display='flex' flexDirection="column" justifyContent='center' alignItems='center'>
        <SearchBar />
        <Paper elevation={3} className={classes.root}>
        {loading? (
            <PublicationsViewSkeleton />
        ):(
            <>
                <Box className={classes.title} textAlign='center'>
                    <Typography variant='h4'>
                    TUTORES
                    </Typography>
                </Box>
                <Box>
                        {tutors.map((tutor, index) => (
                          <TutorCard
                            key={index}
                            id={tutor.id}
                            tutor={tutor}/>
                        ))}
                </Box>
            </>
        )}
        </Paper>
    </Box>
    </Page>
  )
}

const mapStateToProps = (state) => ({
  tutors: state.tutorsInfo.tutors,
  loading: state.tutorsInfo.loading
})

export default connect(mapStateToProps, {
  getTutors
})(TutorsView)
