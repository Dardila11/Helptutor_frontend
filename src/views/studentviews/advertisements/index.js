import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { getAdvertisements } from 'src/redux/actions/student/advertisements'
import { connect } from 'react-redux'
import SearchBar from 'src/components/SearchBar'
import AdvertisementFormView from './advertisementForm'
import Page from 'src/components/Page'
import AdvertisementCard from 'src/components/advertisementCard'
import CardsViewSkeleton from 'src/components/skeletons/CardsViewSkeleton'

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
    width: 300,
    backgroundColor: theme.palette.primary.main  ,
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
  const {
    loadingAdvertisement,
    getAdvertisements,
    advertisements,
    creating
  } = props
  const [open, setOpen] = useState(false)
  const [myAdsView, setMyAdsView] = useState(false)
  const [query, setQuery] = useState('')
  const [listFilter, setListFilter] = useState(null)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleMyAdvertisements = () => {
    setMyAdsView(true)
  }

  const handleMyAdvertisementsClose = () => {
    setMyAdsView(false)
  }

  useEffect(
    () => {
      getAdvertisements()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  useEffect(
    () => {
      if(query==='') setListFilter(null)
      else setListFilter(advertisements.filter(ad => ad.title.toLowerCase().includes(query.toLowerCase()) || ad.description.toLowerCase().includes(query.toLowerCase())))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query]
  )  

  return (
    <Page title="Anuncios">
      <Box display='flex' flexDirection='row' justifyContent='center'>
        <Box>
          <SearchBar option={'anuncios'} list={advertisements} setQuery={setQuery}/>
        </Box>
        <Box>
          <Paper elevation={3} className={classes.root}>
            {loadingAdvertisement ? (
              <CardsViewSkeleton type='advetisements'/>
            ) : (
              <>
                <Box className={classes.title} textAlign="center">
                  <Typography variant="h4">Anuncios</Typography>
                </Box>
                {creating ? (
                  <CircularProgress />
                ) : (
                  <>
                    <Grid
                      container
                      spacing={4}
                      className={classes.buttonContainer}>
                      <Grid item xs={6}>
                        <Box className={classes.addAdButton}>
                            <Button
                              className={classes.button}
                              variant="contained"
                              color="primary"
                              startIcon={<AddCircleIcon />}
                              onClick={handleOpen}>
                              Agregar anuncio
                            </Button>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                          <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            startIcon={<VisibilityIcon />}
                            onClick={handleMyAdvertisements}>
                            Ver mis anuncios
                          </Button>
                        <Dialog
                          open={myAdsView}
                          onClose={handleMyAdvertisementsClose}>
                          <DialogTitle>Mis publicaciones</DialogTitle>
                          <DialogContent></DialogContent>
                        </Dialog>
                      </Grid>
                    </Grid>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="publications-dialog-title">
                      <AdvertisementFormView />
                    </Dialog>
                  </>
                )}
                <Box>
                  {listFilter===null? (
                    <>
                    {advertisements.map((advertisement, index) => (
                        <AdvertisementCard
                          key={index}
                          id={advertisement.id}
                          advertisement={advertisement}
                          isSearch={false}
                        />
                    ))}
                    </>
                  ):(
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
                    ):(
                      <Box className={classes.nofindbox} textAlign='center'>
                          <Typography>
                            No se encontraron anuncios que contengan "{query}"
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
  advertisements: state.advertisements.advertisements,
  loadingAdvertisement: state.advertisements.loadingAdvertisement,
  creating: state.advertisements.creating
})

export default connect(mapStateToProps, {
  getAdvertisements
})(StudentAdvertisementsView)
