import React, { useState, useEffect } from 'react'
import { useAuthState } from 'src/context'
import TutorServiceCard1 from 'src/components/cards/tutorServiceCard1.js'
import Page from 'src/components/Page'
import SearchBar from 'src/components/SearchBar'

// STYLES
import { Box, makeStyles, Paper, Typography, Grid } from '@material-ui/core'
import useAggrement from 'src/hooks/TutorHooks/useAggrement'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2)
  }
}))

const TutorAggrementsView = () => {
  const classes = useStyles()
  const { user } = useAuthState()
  const [query, setQuery] = useState('')
  const { useAggrements } = useAggrement
  const { data: services, isLoading } = useAggrements(user.id)
  const [filter, setFilter] = useState({ label: '', value: 0 })

  const [listFilter, setListFilter] = useState(null)

  useEffect(() => {
    query === ''
      ? setListFilter(null)
      : setListFilter(
          services.filter(
            (pub) =>
              pub.service.title.toLowerCase().includes(query.toLowerCase()) ||
              pub.service.description
                .toLowerCase()
                .includes(query.toLowerCase())
          )
        )
  }, [query, services])

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
            setListFilter(services.filter((serv) => serv.price <= filt.value))
        }
        break

      default:
        break
    }
  }

  return (
    <Page title="Asesorias">
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <SearchBar
            option={'service'}
            list={services}
            setQuery={setQuery}
            setFilter={setFilter}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper className={classes.container} elevation={1}>
            <Box textAlign="center">
              <Typography variant="h4">Asesorias</Typography>
            </Box>
            <Box>
              {isLoading ? (
                <span>Cargando...</span>
              ) : listFilter === null ? (
                <>
                  {services.map((item, key) => (
                    <TutorServiceCard1 key={key} aggrement={item} />
                  ))}
                </>
              ) : (
                <>
                  {listFilter.length > 0 ? (
                    <>
                      {listFilter.map((item, index) => (
                        <TutorServiceCard1
                          key={index}
                          aggrement={item}
                          isSearch={true}
                          query={query}
                        />
                      ))}
                    </>
                  ) : (
                    <Box textAlign="center">
                      <Typography>
                        No se encontraron publicaciones que contengan "{query}"
                      </Typography>
                    </Box>
                  )}
                </>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Page>
  )
}

export default TutorAggrementsView
