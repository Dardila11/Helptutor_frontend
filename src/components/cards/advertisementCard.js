import React, { useState } from 'react'
import {
  Avatar,
  CardActionArea,
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
import AnswerView from 'src/views/studentviews/advertisements/answers/answer'

import { clearAnswers } from 'src/redux/actions/student/advertisements'
import { connect } from 'react-redux'
import { isUndefined } from 'lodash-es'

import { useAuthState } from 'src/context/context'

import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import VisibilityIcon from '@material-ui/icons/Visibility'
import ChatIcon from '@material-ui/icons/Chat'

const useStyles = makeStyles((theme) => ({
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: 60,
    height: 60
  },
  paper: {
    display: 'flex',
    height: 120,
    borderRadius: '20px',
    margin: theme.spacing(1),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  },
  options: {
    marginTop: theme.spacing(2)
  },
  cardAction: {
    borderRadius: '20px'
  },
  userSpace: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  }
}))

const AdvertisementCard = (props) => {
  const { advertisement, clearAnswers, student, isSearch, query } = props
  const [open, setOpen] = useState(false)
  const classes = useStyles()
  const userId = useAuthState().user.id
  const idDialog = 'advertisement' + advertisement.id + '-dialog-title'
  const [watch, setWatch] = React.useState(false)
  const [edit, setEdit] = React.useState(false)
  const [deletep, setDelete] = React.useState(false)
  console.log(userId)
  console.log(advertisement.student.user.id)

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
    setDelete(false)
  }
  const handleClose = () => {
    setWatch(false)
    setEdit(false)
    setDelete(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  /* const handleClose = () => {
    setOpen(false)
    clearAnswers()
  } */

  const getHighlightedText = (text) => {
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return (
      <span>
        {' '}
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
        ))}{' '}
      </span>
    )
  }
  return (
    <Paper className={classes.paper} elevation={3}>
      <CardActionArea className={classes.cardAction} onClick={handleOpen}>
        <Grid container>
          <Grid item xs={2}>
            <Box className={classes.userSpace}>
              <Avatar
                className={classes.cover}
                alt="user photo"
                src="/static/images/avatars/avatar_6.png"
              />
              <Typography>
                <b>
                  {advertisement.student.user.first_name}{' '}
                  {advertisement.student.user.last_name}
                </b>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                <Box fontWeight="fontWeightBold">
                  {isSearch && !isUndefined(query)
                    ? getHighlightedText(advertisement.title)
                    : advertisement.title}
                </Box>
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {isSearch
                  ? getHighlightedText(advertisement.description)
                  : advertisement.description}
              </Typography>
              </CardContent>
            </Box>
          </Grid>
          {userId === advertisement.student.user.id ? (
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
                  <Tooltip title="comentarios" placement="bottom" arrow>
                    <IconButton color="primary" onClick={handleWatch}>
                      <Badge badgeContent={4} color="primary">
                        <ChatIcon />
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
              {/* <Dialog
              open={watch}
              onClose={handleClose}
              maxWidth="md"
              scroll="paper"
              fullWidth={true}
              aria-labelledby="tutorSelection-dialog-title">
              <TutorSelectionView
                onClose={handleClose}
                id={advertisement.id}
                key={publication.id}
                publication={publication}
              />
            </Dialog> */}
              {/* <Dialog
              open={edit}
              onClose={handleClose}
              aria-labelledby="publications-dialog-title">
              <UpdatePublicationFormView
                onClose={handleClose}
                publication={publication}
              />
            </Dialog> */}
              <Dialog
                open={deletep}
                onClose={handleClose}
                aria-labelledby="tutorDeletePublication-dialog-title">
                <DialogTitle align="center">
                  <Typography component={'span'} variant="h4">
                    Eliminar publicación
                  </Typography>
                </DialogTitle>
                <DialogContent>
                  ¿Estas seguro de eliminar la publicación{' '}
                  <b>{advertisement.title}</b>?
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleClose}>
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
          ) : (
            <></>
          )}
        </Grid>
      </CardActionArea>
      <Dialog open={open} onClose={handleClose} aria-labelledby={idDialog}>
        <AnswerView
          id={advertisement.id}
          advertisement={advertisement}
          student={student}
        />
      </Dialog>
    </Paper>
  )
}

const mapStateToProps = (state) => ({
  student: state.advertisements.advertisement.student
})

export default connect(mapStateToProps, {
  clearAnswers
})(AdvertisementCard)
