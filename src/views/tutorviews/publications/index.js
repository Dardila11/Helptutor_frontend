import React, { useEffect, useState } from 'react'
import { Box, makeStyles, Paper, Typography } from '@material-ui/core'

import {
  getPublications,
  getNominations
} from 'src/redux/actions/tutor/nominations'
import { connect } from 'react-redux'
import CardsViewSkeleton from 'src/components/skeletons/CardsViewSkeleton'
import SearchBar from 'src/components/SearchBar'
import TutorPublicationCard from 'src/components/tutorPublicationCard'
import Page from 'src/components/Page'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    borderRadius: '20px',
    width: 1000
  },
  cardsContent: {
    margin: theme.spacing(2),
    borderRadius: '20px'
  },
  title: {
    margin: theme.spacing(2)
  }
}))

const TutorPublicationsView = (props) => {
  const classes = useStyles()
  const {
    loading,
    getPublications,
    getNominations,
    publications,
    nominations
  } = props
  const [query, setQuery] = useState('')
  const [listFilter, setListFilter] = useState(null)

  useEffect(
    () => {
      getPublications()
      getNominations()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(
    () => {
      if(query==='') setListFilter(null)
      else setListFilter(publications.filter(pub => pub.title.toLowerCase().includes(query.toLowerCase()) || pub.description.toLowerCase().includes(query.toLowerCase())))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query]
  ) 

  return (
    <Page title="Publicaciones">
      <Box display='flex' flexDirection='row' justifyContent='center'>
        <Box sm={12}>
          <SearchBar option={'publicaciones'} list={publications} setQuery={setQuery}/>
        </Box>
        <Box>
          <Paper elevation={3} className={classes.root}>
            {loading ? (
              <CardsViewSkeleton type='publications' />
            ) : (
              <>
                <Box className={classes.title} textAlign="center">
                  <Typography variant="h4">PUBLICACIONES</Typography>
                </Box>
                <Box>
                {listFilter===null? (
                    <>
                    {publications.map((publication, index) => (
                    <TutorPublicationCard
                    key={index}
                    id={publication.id}
                    publication={publication}
                    nomination={
                      nominations.filter(
                        (nom) => nom.offer === publication.id
                      )[0]
                    }
                    isStudent={false}
                    isSearch={false}
                />
                ))}
                    </>
                  ):(
                    <>
                    {listFilter.length > 0 ? (
                      <>
                      {listFilter.map((publication, index) => (
                        <TutorPublicationCard
                        key={index}
                        id={publication.id}
                        publication={publication}
                        nomination={
                          nominations.filter(
                            (nom) => nom.offer === publication.id
                          )[0]
                        }
                        isStudent={false}
                        isSearch={true}
                        query={query}
                      />
                      ))}
                      </>
                    ):(
                      <Box className={classes.nofindbox} textAlign='center'>
                          <Typography>
                            No se encontraron publicaciones que contengan "{query}"
                          </Typography>
                      </Box>
                    )}
                    </>
                  )}  
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
  publications: state.nominations.publications,
  nominations: state.nominations.nominations,
  loading: state.nominations.loading
})

export default connect(mapStateToProps, {
  getPublications,
  getNominations
})(TutorPublicationsView)
