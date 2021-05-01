import React, { useEffect } from 'react'
import { Box, makeStyles, Paper, Typography } from '@material-ui/core'

import { getPublications, getNominations } from 'src/redux/actions/tutor/nominations'
import { connect } from 'react-redux'
import PublicationsViewSkeleton from 'src/components/skeletons/PublicationsViewSkeleton'
import SearchBar from 'src/components/SearchBar'
import TutorPublicationCard from 'src/components/tutorPublicationCard'
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

const TutorPublicationsView = (props) => {
  const classes = useStyles()
  const {loading, getPublications, getNominations, publications, nominations} = props
  
  useEffect(()=>{
    getPublications()
    getNominations()
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [])
  
  return (
    <Page title='Publicaciones'>
      <Box display='flex' flexDirection="column" justifyContent='center' alignItems='center'>
        <SearchBar />
        <Paper elevation={3} className={classes.root}>
        {loading? (
            <PublicationsViewSkeleton />
        ):(
            <>
                <Box className={classes.title} textAlign='center'>
                    <Typography variant='h4'>
                    PUBLICACIONES
                    </Typography>
                </Box>
                <Box>
                        {publications.map((publication, index) => (
                          <TutorPublicationCard
                            key={index}
                            id={publication.id}
                            publication={publication}
                            nomination={nominations.filter(nom => nom.offer === publication.id)[0]}/>
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
  publications: state.nominations.publications,
  nominations: state.nominations.nominations,
  loading: state.nominations.loading
})

export default connect(mapStateToProps, {
  getPublications,
  getNominations
})(TutorPublicationsView)
