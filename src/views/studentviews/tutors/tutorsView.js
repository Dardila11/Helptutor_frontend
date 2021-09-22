import React, { useEffect, useState } from 'react'
import { Box, makeStyles, Paper, Typography } from '@material-ui/core'

import CardsViewSkeleton from 'src/components/skeletons/CardsViewSkeleton'
import SearchBar from 'src/components/SearchBar'
import TutorServiceCard from 'src/components/cards/tutorServiceCard'
import Page from 'src/components/Page'

import useTutorsServices from 'src/hooks/TutorHooks/useTutorServices'

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
  const tutorServicesQuery = useTutorsServices()
  console.log(tutorServicesQuery);

  useEffect(
    () => {
      if (query === '') setListFilter(null)
      else
        setListFilter(
          tutorServicesQuery.data.filter(
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
          else setListFilter(tutorServicesQuery.data.filter((serv) => serv.price <= filt.value))
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
            list={tutorServicesQuery.data}
            setQuery={setQuery}
            setFilter={setFilter}
          />
        </Box>
        <Box>
          <Paper elevation={3} className={classes.root}>
            {tutorServicesQuery.isLoading ? (
              <CardsViewSkeleton />
            ) : tutorServicesQuery.status === 'success' ? (
              <>
                {tutorServicesQuery.data.length === 0 ? (
                  <Box className={classes.title} textAlign="center">
                    <Typography variant="h5">No hay servicios</Typography>
                  </Box>
                ) : (
                  <>
                    <Box className={classes.title} textAlign="center">
                      <Typography variant="h4">Servicios ofertados</Typography>
                    </Box>
                    <Box>
                      {listFilter === null ? (
                        <>
                          {tutorServicesQuery.data.map((service, index) => (
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
                            <Box
                              className={classes.nofindbox}
                              textAlign="center">
                              <Typography>
                                No se encontraron servicios que contengan "
                                {query}"
                              </Typography>
                            </Box>
                          )}
                        </>
                      )}
                    </Box>
                  </>
                )}
              </>
            ) : (
              <>
                <Box paddingLeft="10px">
                  <Typography> {tutorServicesQuery.error.message}</Typography>
                </Box>
              </>
            )}
          </Paper>
        </Box>
      </Box>
    </Page>
  )
}

export default TutorsView
