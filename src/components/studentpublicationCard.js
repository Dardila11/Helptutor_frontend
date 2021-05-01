import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Paper } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import VisibilityIcon from '@material-ui/icons/Visibility'
import TutorSelectionView from 'src/views/studentviews/publications/tutorselection/tutorSelectionView'
import PublicationFormView from 'src/views/studentviews/publications/publicationForm'
import { deletePublication } from 'src/redux/actions/student/student_publications'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
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
}));

const StudentPublicationCard = (props) => {
  const { publication, isStudent, deletePublication} = props
  const classes = useStyles();
  const [watch, setWatch] = React.useState(false)
  const [edit, setEdit] = React.useState(false)
  const [deletep, setDelete] = React.useState(false)

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
    deletePublication(publication.id)
    setDelete(false)
  }
  const handleClose = () => {
    setWatch(false)
    setEdit(false)
    setDelete(false)
  }
  let gridValue = 12
  if(isStudent){
    gridValue = 9
  }
  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container >
        <Grid item xs={gridValue}>
          <Box className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                <Box fontWeight="fontWeightBold">
                  {publication.title} 
                </Box>
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {publication.description}
              </Typography>
            </CardContent>
        </Box>
        </Grid>
        {isStudent? (
          <Grid className={classes.options} item xs={3}>
          <Box display='flex' flexDirection='column' alignItems='center' textAlign='center'>
            <Typography color="textSecondary">
               <b>Opciones</b>
            </Typography>
            <Box spacing={3}> 
                <IconButton color='primary' onClick={handleWatch}>
                    <VisibilityIcon/>
                </IconButton>
                <IconButton color='primary' onClick={handleEdit}>
                    <EditIcon />
                </IconButton>   
                <IconButton color='primary' onClick={handleOpenDelete}>
                    <DeleteIcon />
                </IconButton>
            </Box>
            </Box>
              <Dialog 
                open={watch}
                onClose={handleClose}    
                maxWidth='md'
                fullWidth={true}
                aria-labelledby='tutorSelection-dialog-title'>
                  <TutorSelectionView id={publication.id} key={publication.id} publication={publication}/>
              </Dialog>
              <Dialog 
                open={edit}
                onClose={handleClose}    
                aria-labelledby='publications-dialog-title'>
                  <PublicationFormView publication={publication}/>
              </Dialog>
              <Dialog 
                open={deletep}
                onClose={handleClose}    
                aria-labelledby='tutorDeletePublication-dialog-title'>
                  <DialogTitle align='center'>
                    <Typography variant='h4'>
                      Eliminar publicación
                    </Typography>
                  </DialogTitle>
                  <DialogContent>
                      ¿Estas seguro de eliminar la publicación <b>{publication.title}</b>?
                  </DialogContent>
                  <DialogActions>
                      <Button variant='outlined' color='primary' onClick={handleClose}>
                        Cancelar
                      </Button>
                      <Button variant='contained' color='primary' onClick={handleDelete}>
                        Eliminar
                      </Button>
                  </DialogActions>
              </Dialog>
        </Grid>
        ):(<></>)}
      </Grid>
    </Paper>
  );
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
  deletePublication
})(StudentPublicationCard)