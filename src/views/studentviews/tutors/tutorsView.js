import React, { useEffect, useState } from 'react'
import { Box, makeStyles, Paper, Typography } from '@material-ui/core'

import CardsViewSkeleton from 'src/components/skeletons/CardsViewSkeleton'
import SearchBar from 'src/components/SearchBar'
import TutorServiceCard from 'src/components/cards/tutorServiceCard'
import Page from 'src/components/Page'

import useFetchTutors from 'src/hooks/useFetchTutors'

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

const TutorsView = () => {
  const classes = useStyles()
  const [query, setQuery] = useState('')
  const [listFilter, setListFilter] = useState(null)
  const [filter, setFilter] = useState({ label: '', value: 0 })
  const queryFetchTutors = useFetchTutors()

  useEffect(
    () => {
      if (query === '') setListFilter(null)
      else
        setListFilter(
          queryFetchTutors.data.filter(
            (serv) =>
              serv.title.toLowerCase().includes(query.toLowerCase()) ||
              serv.description.toLowerCase().includes(query.toLowerCase())
          )
        )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query]
  )

  useEffect(
    () => {
      filters(filter)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filter]
  )

  function filters(filt) {
    switch (filt.label) {
      case 'cost':
        if (filt.value !== 0) {
          if (!listFilter === null)
            setListFilter(listFilter.filter((serv) => serv.price <= filt.value))
          else
            setListFilter(
              queryFetchTutors.data.filter((serv) => serv.price <= filt.value)
            )
        }
        break

      default:
        break
    }
  }

  return (
    <Page title="Tutores">
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Box>
          <SearchBar
            option={'servicios'}
            list={queryFetchTutors.data}
            setQuery={setQuery}
            setFilter={setFilter}
          />
        </Box>
        <Box>
          <Paper elevation={3} className={classes.root}>
            {queryFetchTutors.isLoading ? (
              <CardsViewSkeleton />
            ) : queryFetchTutors.status === 'success' ? (
              <>
                <Box className={classes.title} textAlign="center">
                  <Typography variant="h4">Servicios ofertados</Typography>
                </Box>
                <Box>
                  {listFilter === null ? (
                    <>
                      {queryFetchTutors.data.map((service, index) => (
                        <TutorServiceCard
                          key={index}
                          id={service.id}
                          service={service}
                          isStudent={true}
                          isSearch={false}
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      {listFilter.length > 0 ? (
                        <>
                          {listFilter.map((service, index) => (
                            <TutorServiceCard
                              key={index}
                              id={service.id}
                              service={service}
                              isStudent={true}
                              isSearch={true}
                              query={query}
                            />
                          ))}
                        </>
                      ) : (
                        <Box className={classes.nofindbox} textAlign="center">
                          <Typography>
                            No se encontraron servicios que contengan "{query}"
                          </Typography>
                        </Box>
                      )}
                    </>
                  )}
                </Box>
              </>
            ) : (
              <></>
            )}
          </Paper>
        </Box>
      </Box>
    </Page>
  )
}

export default TutorsView
