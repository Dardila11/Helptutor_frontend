import React, { useEffect, useState } from 'react'
import {
  Box,
  makeStyles,
  Paper,
  Typography,
  Button,
  Dialog
} from '@material-ui/core'

import CardsViewSkeleton from 'src/components/skeletons/CardsViewSkeleton'
import SearchBar from 'src/components/SearchBar'
import CreatePublicationForm from './crud/CreatePublicationForm'
import StudentPublicationCard from 'src/components/cards/studentpublicationCard'
import Page from 'src/components/Page'
import AddCircleIcon from '@material-ui/icons/AddCircle'

import { useOffersByStudentId } from 'src/hooks/StudentHooks/useStudentOffers'
import { useAuthState} from 'src/context/context'

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
    textTransform: 'none'
  }
}))

const StudentPublicationsView = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [listFilter, setListFilter] = useState(null)
  const userId = useAuthState().user.id
  const offersQuery = useOffersByStudentId(userId)

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
          offersQuery.data.filter(
            (pub) =>
              pub.title.toLowerCase().includes(query.toLowerCase()) ||
              pub.description.toLowerCase().includes(query.toLowerCase())
          )
        )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query]
  )

  return (
    <Page title="Publicaciones">
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Box>
          <SearchBar option={'publicaciones'} list={offersQuery.data} setQuery={setQuery} />
        </Box>
        <Box>
          <Paper elevation={3} className={classes.root}>
            <Box display="flex" flexDirection="row" justifyContent="center">
              <Box>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  startIcon={<AddCircleIcon />}
                  onClick={handleOpen}>
                  Agregar publicación
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="publications-dialog-title">
                  <CreatePublicationForm
                    onClose={handleClose}
                    publication={null}
                  />
                </Dialog>
              </Box>
            </Box>
            {offersQuery.status === 'success' ? (
              offersQuery.data.length === 0 ? (
                <Box className={classes.title} textAlign="center">
                  <Typography component='h5' variant="h5">No hay publicaciones</Typography>
                </Box>
              ) : (
                <>
                  <Box className={classes.title} textAlign="center">
                    <Typography variant="h4">Mis publicaciones</Typography>
                  </Box>
                  {listFilter === null ? (
                      offersQuery.data.map((publication, index) => (
                        <StudentPublicationCard
                          key={index}
                          id={publication.id}
                          publication={publication}
                          isSearch={false}
                        />
                      ))
                  ) : (
                    <>
                      {listFilter.length > 0 ? (
                        <>
                          {listFilter.map((publication, index) => (
                            <StudentPublicationCard
                              key={index}
                              id={publication.id}
                              publication={publication}
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
                </>
              )
            ) : (
              <CardsViewSkeleton type="publications" />
            )}
          </Paper>
        </Box>
      </Box>
    </Page>
  )
}

export default StudentPublicationsView
