import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core'

import { getPublications } from 'src/redux/actions/student/student_publications'
import { connect } from 'react-redux'
import CardsViewSkeleton from 'src/components/skeletons/CardsViewSkeleton'
import SearchBar from 'src/components/SearchBar'
import PublicationFormView from './publicationForm'
import StudentPublicationCard from 'src/components/cards/studentpublicationCard'
import Page from 'src/components/Page'
import AddCircleIcon from '@material-ui/icons/AddCircle'

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

const StudentPublicationsView = (props) => {
  const classes = useStyles()
  const { loadingPublications, getPublications, publications, creating } = props
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [listFilter, setListFilter] = useState(null)
  useEffect(
    () => {
      getPublications()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(
    () => {
      if(query==='') setListFilter(null)
      else setListFilter(publications.filter(pub => pub.title.toLowerCase().includes(query.toLowerCase()) || pub.description.toLowerCase().includes(query.toLowerCase())))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query]
  )  

  return (
    <Page title="Publicaciones">
      <Box display='flex' flexDirection='row' justifyContent='center'>
        <Box>
          <SearchBar option={'publicaciones'} list={publications} setQuery={setQuery}/>
        </Box>
        <Box>
          <Paper elevation={3} className={classes.root}>
            {loadingPublications ? (
              <CardsViewSkeleton type='publications'/>
            ) : (
              <>
                <Box className={classes.title} textAlign="center">
                  <Typography variant="h4">Mis plublicaciones</Typography>
                </Box>
                {creating ? (
                  <CircularProgress />
                ) : (
                  <>
                    <Box display='flex' flexDirection='row' justifyContent='center'>
                      <Box>
                        <Button
                          className={classes.button}
                          variant="contained"
                          color="primary"
                          startIcon={<AddCircleIcon />}
                          onClick={handleOpen}>
                          Agregar publicación
                        </Button>
                      </Box>
                    </Box>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="publications-dialog-title">
                      <PublicationFormView publication={null} />
                    </Dialog>
                  </>
                )}
                {listFilter===null? (
                    <>
                    {publications.map((publication, index) => (
                  <StudentPublicationCard
                    key={index}
                    id={publication.id}
                    publication={publication}
                    isStudent={true}
                    isSearch={false}
                  />
                ))}
                    </>
                  ):(
                    <>
                    {listFilter.length > 0 ? (
                      <>
                      {listFilter.map((publication, index) => (
                        <StudentPublicationCard
                        key={index}
                        id={publication.id}
                        publication={publication}
                        isStudent={true}
                        isSearch={true}
                        query={query}
                      />
                      ))}
                      </>
                    ):(
                      <Box className={classes.nofindbox} textAlign='center'>
                          <Typography>
                            No se encontraron publicaciones que contengan "{query}"
                          </Typography>
                      </Box>
                    )}
                    </>
                  )}       
              </>
            )}
          </Paper>
        </Box>
      </Box>
    </Page>
  )
}

const mapStateToProps = (state) => ({
  publications: state.publications.publications,
  loadingPublications: state.publications.loadingPublications,
  creating: state.publications.creating
})

export default connect(mapStateToProps, {
  getPublications
})(StudentPublicationsView)
