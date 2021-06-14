import React, { useState } from 'react'

import CertificateDialog from 'src/views/tutorviews/manageKnowledgeArea/knowledgeAreaInfo/certificates/certificateDialog'

//material-ui
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    ListItem,
    ListItemText,
    makeStyles,
    Typography
  } from '@material-ui/core'
  import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
  import EditIcon from '@material-ui/icons/Edit'
  import DeleteIcon from '@material-ui/icons/Delete'

//redux
import { DeleteCertificate } from 'src/redux/actions/tutor/certificates'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    supportItem: {
        padding: '0px'
    }
}))

const CertificateCard = (props) => {

    const { certificate , DeleteCertificate } = props

    const classes = useStyles()

    const [openDelete, setOpenDelete] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)

    const handleOpenEdit = () => {
        setOpenEdit(true)
    }
    const handleCloseEdit = () => {
        setOpenEdit(false)
    }

    const handleOpenDelete = () => {
        setOpenDelete(true)
    }

    const handleCloseDelete = () => {
        setOpenDelete(false)
    }

    const handleDelete = () => {
        DeleteCertificate(certificate.title)
        setOpenDelete(false)
    }
    return (
        <ListItem className={classes.supportItem}>
            <PictureAsPdfIcon />
            <ListItemText primary={certificate.title} />
            <IconButton aria-label="editar soporte" component="span" onClick={handleOpenEdit}>
                <EditIcon />
            </IconButton>
            <IconButton aria-label="editar soporte" component="span" onClick={handleOpenDelete}>
                <DeleteIcon />
            </IconButton>
            <Dialog
              open={openEdit}
              onClose={handleCloseEdit}>
                <DialogTitle align="center">
                  <Typography variant="h4">Modificar certificado</Typography>
                </DialogTitle>
                <CertificateDialog certificate={certificate} add={false} close={handleCloseEdit}/>
            </Dialog>
            <Dialog
                open={openDelete}
                onClose={handleCloseDelete}>
                <DialogTitle align="center">
                    <Typography variant="h4">Eliminar soporte</Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Estas seguro de querer eliminar el soporte de {certificate.title}?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' color='primary' onClick={handleCloseDelete}>
                        Cancelar
                    </Button>
                    <Button variant='contained' color='primary' onClick={handleDelete}>
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </ListItem>
    )
}

const mapStateToProps = (state) => ({
  })
  
export default connect(mapStateToProps, {
    DeleteCertificate
})(CertificateCard)
