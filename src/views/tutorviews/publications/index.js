import React, { useEffect, useState } from 'react'

// QUERY
import useOffers from 'src/hooks/TutorHooks/useOffers'

// COMPONENT
import CardsViewSkeleton from 'src/components/skeletons/CardsViewSkeleton'
import SearchBar from 'src/components/SearchBar'
import TutorPublicationCard from 'src/components/cards/tutorPublicationCard'
import Page from 'src/components/Page'

// STYLES
import { Box, makeStyles, Paper, Typography, Grid } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2)
  }
}))

const TutorPublicationsView = () => {
  const classes = useStyles()
  const { data: publications, isLoading } = useOffers()
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
        <Grid item xs={12} md={3}>
          <SearchBar
            option={'publication'}
            list={publications}
            setQuery={setQuery}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper className={classes.container} elevation={1}>
            {isLoading ? (
              <CardsViewSkeleton type="publications" />
            ) : (
              <>
                <Box textAlign="center">
                  <Typography variant="h4">Publicaciones</Typography>
                </Box>
                <Box>
                  {listFilter === null ? (
                    <>
                      {publications.map((publication, index) => (
                        <TutorPublicationCard
                          key={index}
                          publication={publication}
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
                              publication={publication}
                              isSearch={true}
                              query={query}
                            />
                          ))}
                        </>
                      ) : (
                        <Box textAlign="center">
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
