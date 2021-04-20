import React, { useEffect } from 'react'
import { Box, CircularProgress, makeStyles, Paper, Typography } from '@material-ui/core'

import { getPublications } from 'src/redux/actions/publications'
import { connect } from 'react-redux'
import PublicationsViewSkeleton from 'src/components/skeletons/PublicationsViewSkeleton'
import SearchBar from 'src/components/SearchBar'
import PublicationFormView from './publicationForm'
import PublicationCard from 'src/components/publicationCard'
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

const StudentPublicationsView = (props) => {
  const classes = useStyles()
  const {loadingPublications, getPublications, publications,creating} = props
  useEffect(()=>{
    getPublications()
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [])

  return (
    <Page title='Publicaciones'>
      <Box display='flex' flexDirection="column" justifyContent='center' alignItems='center'>
        <SearchBar />
        <Paper elevation={3} className={classes.root}>
        {loadingPublications? (
            <PublicationsViewSkeleton />
        ):(
            <>
                <Box className={classes.title} textAlign='center'>
                    <Typography variant='h4'>
                    MIS PUBLICACIONES
                    </Typography>
                </Box>
                {creating? (
                  <CircularProgress />
                ):(                  
                  <PublicationFormView/>
                )}
                <Box>
                        {publications.map((publication, index) => (
                          <PublicationCard
                            key={index}
                            id={publication.id}
                            publication={publication}/>
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
  publications: state.publications.publications,
  loadingPublications: state.publications.loadingPublications,
  creating: state.publications.creating
})

export default connect(mapStateToProps, {
  getPublications
})(StudentPublicationsView)
