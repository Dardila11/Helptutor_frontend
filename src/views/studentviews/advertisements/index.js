import React, { useEffect, useState } from 'react'
import {
  Box,
  makeStyles,
  Paper,
  Typography,
  Button,
  Dialog
} from '@material-ui/core'

import SearchBar from 'src/components/SearchBar'
import Page from 'src/components/Page'
import AdvertisementCard from 'src/components/cards/advertisementCard'
import CardsViewSkeleton from 'src/components/skeletons/CardsViewSkeleton'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import {useAdvertisements} from 'src/hooks/useAdvertisements'
import CreateAdForm from './crud/CreateAdForm'

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
  nofindbox: {
    margin: theme.spacing(2)
  }
}))

const StudentAdvertisementsView = (props) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const adsQuery = useAdvertisements()
  const [query, setQuery] = useState('')
  const [listFilter, setListFilter] = useState(null)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(
    () => {
      if (query === '') setListFilter(null)
      else
        setListFilter(
          adsQuery.data.filter(
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
          <SearchBar option={'anuncios'} list={adsQuery.data} setQuery={setQuery} />
        </Box>
        <Box>
          <Paper elevation={3} className={classes.root}>
            <Box display="flex" flexDirection="row" justifyContent="center">
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                startIcon={<AddCircleIcon />}
                onClick={handleOpen}>
                Agregar Anuncio
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="ads-dialog-title">
                {/* <AdvertisementFormView onClose={handleClose} /> */}
                <CreateAdForm onClose={handleClose}/>
              </Dialog>
            </Box>
            {adsQuery.status === 'success' ? (
              adsQuery.data.length === 0 ? (
                <Box className={classes.title} textAlign="center">
                  <Typography variant="h5">No hay anuncios</Typography>
                </Box>
              ) : (
                <Box>
                  {listFilter === null ? (
                    <>
                      {adsQuery.data.map((advertisement, index) => (
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
