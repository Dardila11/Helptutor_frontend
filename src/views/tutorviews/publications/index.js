import React, { useEffect, useState } from 'react'
import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import CardsViewSkeleton from 'src/components/skeletons/CardsViewSkeleton'
import SearchBar from 'src/components/SearchBar'
import TutorPublicationCard from 'src/components/cards/tutorPublicationCard'
import Page from 'src/components/Page'
import useOffers from 'src/hooks/TutorHooks/useOffers'

const useStyles = makeStyles((theme) => ({
  main: {
    padding: '0 1rem'
  },
  options: {
    padding: '0 1rem',
    paddingBottom: '0.5rem'
  },
  root: {
    borderRadius: '20px',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  cardsContent: {
    borderRadius: '20px'
  },
  title: {
    margin: theme.spacing(1)
  }
}))

const TutorPublicationsView = (props) => {
  const classes = useStyles()
  const { data, isLoading } = useOffers()
  const publications = data
  const [query, setQuery] = useState('')
  const [listFilter, setListFilter] = useState(null)
  useEffect(() => {
    if (query === '') setListFilter(null)
    else
      setListFilter(
        publications.filter(
          (pub) =>
            pub.title.toLowerCase().includes(query.toLowerCase()) ||
            pub.description.toLowerCase().includes(query.toLowerCase())
        )
      )
  }, [query])

  return (
    <Page title="Publicaciones">
      <Grid container>
        <Grid className={classes.options} item xs={12} md={3}>
          <SearchBar
            option={'publicaciones'}
            list={publications}
            setQuery={setQuery}
          />
        </Grid>
        <Grid className={classes.main} item xs={12} md={9}>
          <Paper elevation={3} className={classes.root}>
            {isLoading ? (
              <CardsViewSkeleton type="publications" />
            ) : (
              <>
                <Box className={classes.title} textAlign="center">
                  <Typography variant="h4">PUBLICACIONES</Typography>
                </Box>
                <Box>
                  {listFilter === null ? (
                    <>
                      {publications.map((publication, index) => (
                        <TutorPublicationCard
                          key={index}
                          id={publication.id}
                          publication={publication}
                          isStudent={false}
                          isSearch={false}
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      {listFilter.length > 0 ? (
                        <>
                          {listFilter.map((publication, index) => (
                            <TutorPublicationCard
                              key={index}
                              id={publication.id}
                              publication={publication}
                              isStudent={false}
                              isSearch={true}
                              query={query}
                            />
                          ))}
                        </>
                      ) : (
                        <Box className={classes.nofindbox} textAlign="center">
                          <Typography>
                            No se encontraron publicaciones que contengan 
                            {query}
                          </Typography>
                        </Box>
                      )}
                    </>
                  )}
                </Box>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Page>
  )
}

export default TutorPublicationsView
