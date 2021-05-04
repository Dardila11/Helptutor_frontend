import React, { useEffect } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core'

import { getPublications } from 'src/redux/actions/student/student_publications'
import { connect } from 'react-redux'
import PublicationsViewSkeleton from 'src/components/skeletons/PublicationsViewSkeleton'
import SearchBar from 'src/components/SearchBar'
import PublicationFormView from './publicationForm'
import StudentPublicationCard from 'src/components/studentpublicationCard'
import Page from 'src/components/Page'
import AddCircleIcon from '@material-ui/icons/AddCircle'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    borderRadius: '20px',
    width: 900
  },
  buttonContainer: {
    width: 300
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
  const [open, setOpen] = React.useState(false)
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

  return (
    <Page title="Publicaciones">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center">
        <SearchBar />
        <Paper elevation={3} className={classes.root}>
          {loadingPublications ? (
            <PublicationsViewSkeleton />
          ) : (
            <>
              <Box className={classes.title} textAlign="center">
                <Typography variant="h4">Mis plublicaciones</Typography>
              </Box>
              {creating ? (
                <CircularProgress />
              ) : (
                <>
                  <Container className={classes.buttonContainer}>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      startIcon={<AddCircleIcon />}
                      onClick={handleOpen}>
                      Agregar publicación
                    </Button>
                  </Container>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="publications-dialog-title">
                    <PublicationFormView publication={null} />
                  </Dialog>
                </>
              )}
              {publications.map((publication, index) => (
                <StudentPublicationCard
                  key={index}
                  id={publication.id}
                  publication={publication}
                  isStudent={true}
                />
              ))}
            </>
          )}
        </Paper>
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
