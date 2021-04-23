import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Dialog, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { getAdvertisements } from 'src/redux/actions/advertisements'
import { connect } from 'react-redux'
import PublicationsViewSkeleton from 'src/components/skeletons/PublicationsViewSkeleton'
import SearchBar from 'src/components/SearchBar'
import AdvertisementFormView from './advertisementForm'
import Page from 'src/components/Page'
import AdvertisementCard from 'src/components/advertisementCard'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    borderRadius: '20px',
    width: 900
  },
  cardsContent: {
      margin: theme.spacing(2),
      borderRadius:'20px'
  },
  title:{
      margin: theme.spacing(1)
  },
  button:{
    width: 300
  },
  addAdButton:{
    float: 'right'
  }
}))

const StudentAdvertisementsView = (props) => {
  const classes = useStyles()
  const {loadingAdvertisement, getAdvertisements, advertisements,creating} = props
  const [open, setOpen] = useState(false)

  const handleOpen = () =>{
        setOpen(true)
  }

  const handleClose = () =>{
        setOpen(false)
  }

  useEffect(()=>{
    getAdvertisements()
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [])

  return (
    <Page title='Anuncios'>
      <Box display='flex' flexDirection="column" justifyContent='center' alignItems='center'>
        <SearchBar />
        <Paper elevation={3} className={classes.root}>
        {loadingAdvertisement? (
            <PublicationsViewSkeleton />
        ):(
            <>
                <Box className={classes.title} textAlign='center'>
                    <Typography variant='h4'>
                    ANUNCIOS
                    </Typography>
                </Box>
                {creating? (
                  <CircularProgress />
                ):(                  
                  <>
                    <Grid container spacing={4} className={classes.buttonContainer} >
                      <Grid item xs={6}>
                        <Box className={classes.addAdButton}>
                            <Button className={classes.button} variant='contained' color='primary' startIcon={<AddCircleIcon/>}
                            onClick={handleOpen}
                            > 
                            Agregar anuncio
                            </Button>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Button className={classes.button} variant='contained' color='primary' startIcon={<VisibilityIcon/>}
                          onClick={handleOpen}
                          > 
                          Ver mis anuncios
                          </Button>
                        </Grid>
                    </Grid>
                    <Dialog
                        open={open}
                        onClose={handleClose}    
                        aria-labelledby='publications-dialog-title'
                    >
                      <AdvertisementFormView />
                    </Dialog>
                  </>
                )}
                <Box>
                        {advertisements.map((advertisement, index) => (
                          <AdvertisementCard
                            key={index}
                            id={advertisement.id}
                            advertisement={advertisement}/>
                        ))}
                </Box>
            </>
        )}
        </Paper>
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
