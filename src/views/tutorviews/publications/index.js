import React, { useEffect, useState } from 'react'
import { Box, makeStyles, Paper, Typography, Grid } from '@material-ui/core'
import CardsViewSkeleton from 'src/components/skeletons/CardsViewSkeleton'
import SearchBar from 'src/components/SearchBar'
import TutorPublicationCard from 'src/components/cards/tutorPublicationCard'
import Page from 'src/components/Page'
import useOffers from 'src/hooks/TutorHooks/useOffers'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2)
  },
}))

const TutorPublicationsView = (props) => {
  const classes = useStyles()
  const { data, isLoading } = useOffers()
  const publications = data
  const [query, setQuery] = useState('')
  const [listFilter, setListFilter] = useState(null)

  useEffect(() => {
    query === ''
      ? setListFilter(null)
      : setListFilter(
          publications.filter(
            (pub) =>
              pub.title.toLowerCase().includes(query.toLowerCase()) ||
              pub.description.toLowerCase().includes(query.toLowerCase())
          )
        )
  }, [query, publications])

  return (
    <Page title="Publicaciones">
      <Grid container spacing={2}>
        <Grid className={classes.options} item xs={12} md={3}>
          <SearchBar
            option={'publication'}
            list={publications}
            setQuery={setQuery}
          />
        </Grid>
        <Grid className={classes.main} item xs={12} md={9}>
          <Paper className={classes.container} elevation={3}>
            {isLoading ? (
              <CardsViewSkeleton type="publications" />
            ) : (
              <>
                <Box className={classes.title} textAlign="center">
                  <Typography variant="h4">Publicaciones</Typography>
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
                            No se encontraron publicaciones que contengan "
                            {query}"
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
