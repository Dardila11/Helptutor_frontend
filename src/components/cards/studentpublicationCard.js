import React from 'react'
import {
  makeStyles,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  CardContent,
  Typography
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import VisibilityIcon from '@material-ui/icons/Visibility'

import TutorSelectionView from 'src/views/studentviews/publications/tutorselection/tutorSelectionView'
import UpdatePublicationFormView from 'src/views/studentviews/publications/crud/UpdatePublicationForm'
import { isUndefined } from 'lodash-es'

import { useDeleteOffer } from 'src/hooks/StudentHooks/useStudentOffers'
import { toast } from 'react-toastify'

const useStyles = makeStyles((theme) => ({
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(3),
    width: 60,
    height: 60
  },
  paper: {
    display: 'flex',
    height: 120,
    margin: theme.spacing(1),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    borderRadius: '20px'
  },
  options: {
    marginTop: theme.spacing(2)
  }
}))

const StudentPublicationCard = (props) => {
  const { publication, isSearch, query } = props
  const classes = useStyles()
  const [watch, setWatch] = React.useState(false)
  const [edit, setEdit] = React.useState(false)
  const [deletep, setDelete] = React.useState(false)

  const mutation = useDeleteOffer()

  const handleWatch = () => {
    setWatch(true)
  }
  const handleEdit = () => {
    setEdit(true)
  }

  const handleOpenDelete = () => {
    setDelete(true)
  }
  const handleDelete = () => {
    mutation.mutate(publication.id, {
      onSuccess: () => {
        toast.success('Publicación eliminada')
        setDelete(false)
      }
    })
  }
  const handleClose = () => {
    setWatch(false)
    setEdit(false)
    setDelete(false)
  }
  
  const getHighlightedText = (text) => {
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return (
      <span>
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              part.toLowerCase() === query.toLowerCase()
                ? { fontWeight: 'bold', color: '#2979ff' }
                : {}
            }>
            {part}
          </span>
        ))}
      </span>
    )
  }

  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container>
        <Grid item xs={9}>
          <Box className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                <Box fontWeight="fontWeightBold">
                  {isSearch && !isUndefined(query)
                    ? getHighlightedText(publication.title)
                    : publication.title}
                </Box>
              </Typography>
              <Typography component="h6" variant="subtitle1" color="textSecondary">
                {isSearch && !isUndefined(query)
                  ? getHighlightedText(publication.description)
                  : publication.description}
              </Typography>
            </CardContent>
          </Box>
        </Grid>
        <Grid className={classes.options} item xs={3}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center">
            <Typography color="textSecondary">
              <b>Opciones</b>
            </Typography>
            <Box spacing={3}>
              <Tooltip title="nominados" placement="bottom" arrow>
                <IconButton color="primary" onClick={handleWatch}>
                  <Badge badgeContent={4} color="primary">
                    <VisibilityIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="editar" placement="bottom" arrow>
                <IconButton color="primary" onClick={handleEdit}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="eliminar" placement="bottom" arrow>
                <IconButton color="primary" onClick={handleOpenDelete}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Dialog
            open={watch}
            onClose={handleClose}
            maxWidth="md"
            scroll="paper"
            fullWidth={true}
            aria-labelledby="tutorSelection-dialog-title">
            <TutorSelectionView
              onClose={handleClose}
              id={publication.id}
              key={publication.id}
              publication={publication}
            />
          </Dialog>
          <Dialog
            open={edit}
            onClose={handleClose}
            aria-labelledby="publications-dialog-title">
            <UpdatePublicationFormView
              onClose={handleClose}
              publication={publication}
            />
          </Dialog>
          <Dialog
            open={deletep}
            onClose={handleClose}
            aria-labelledby="tutorDeletePublication-dialog-title">
            <DialogTitle align="center">
              <Typography component={'span'} variant="h4">Eliminar publicación</Typography>
            </DialogTitle>
            <DialogContent>
              ¿Estas seguro de eliminar la publicación <b>{publication.title}</b>?
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" color="primary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDelete}>
                Eliminar
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default StudentPublicationCard
