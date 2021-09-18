import React, { useEffect, useState } from 'react'
import {
  Box,
  CircularProgress,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core'
import { getAdvertisements } from 'src/redux/actions/student/advertisements'
import { connect } from 'react-redux'
import SearchBar from 'src/components/SearchBar'
import AdvertisementFormView from './advertisementForm'
import Page from 'src/components/Page'
import AdvertisementCard from 'src/components/cards/advertisementCard'
import CardsViewSkeleton from 'src/components/skeletons/CardsViewSkeleton'

import useAdvertisements from 'src/hooks/useAdvertisements'

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
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    textTransform: 'none'
  },
  addAdButton: {
    float: 'right'
  },
  nofindbox: {
    margin: theme.spacing(2)
  }
}))

const StudentAdvertisementsView = (props) => {
  const classes = useStyles()
  const { data, isLoading, status } = useAdvertisements()
  const {
    loadingAdvertisement,
    getAdvertisements,
    advertisements,
    creating
  } = props
  const [query, setQuery] = useState('')
  const [listFilter, setListFilter] = useState(null)
  useEffect(
    () => {
      if (query === '') setListFilter(null)
      else
        setListFilter(
          data.filter(
            (ad) =>
              ad.title.toLowerCase().includes(query.toLowerCase()) ||
              ad.description.toLowerCase().includes(query.toLowerCase())
          )
        )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query]
  )

  return (
    <Page title="Anuncios">
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Box>
          <SearchBar option={'anuncios'} list={data} setQuery={setQuery} />
        </Box>
        <Box>
          <Paper elevation={3} className={classes.root}>
            {status === 'success' ? (
              data.length === 0 ? (
                <Box className={classes.title} textAlign="center">
                  <Typography variant="h5">No hay anuncios</Typography>
                </Box>
              ) : (
                <Box>
                  {listFilter === null ? (
                    <>
                      {data.map((advertisement, index) => (
                        <AdvertisementCard
                          key={index}
                          id={advertisement.id}
                          advertisement={advertisement}
                          isSearch={false}
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      {listFilter.length > 0 ? (
                        <>
                          {listFilter.map((advertisement, index) => (
                            <AdvertisementCard
                              key={index}
                              id={advertisement.id}
                              advertisement={advertisement}
                              isSearch={true}
                              query={query}
                            />
                          ))}
                        </>
                      ) : (
                        <Box className={classes.nofindbox} textAlign="center">
                          <Typography>
                            No se encontraron anuncios que contengan "{query}"
                          </Typography>
                        </Box>
                      )}
                    </>
                  )}
                </Box>
              )
            ) : (
              <CardsViewSkeleton type="advetisements" />
            )}
          </Paper>
        </Box>
      </Box>
    </Page>
  )
}

export default StudentAdvertisementsView
