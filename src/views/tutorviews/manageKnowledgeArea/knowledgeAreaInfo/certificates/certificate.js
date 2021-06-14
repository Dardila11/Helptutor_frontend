import React, { useState } from 'react'

//material-ui
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  List,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'

//redux
import { connect } from 'react-redux'

//components
import CertificateCard from 'src/components/cards/CertificateCard'
import CertificateDialog from './certificateDialog'

//styles
const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    marginLeft: theme.spacing(1),
    marginBlockEnd: theme.spacing(1)
  },
  container: {
    marginLeft: theme.spacing(2)
  },
  input: {
    display: 'none'
  },
  gridContainer: {
    marginTop: theme.spacing(1)
  },
  buttonitem: {
    marginLeft: theme.spacing(1)
  },
  actionsContainer: {
    marginTop: theme.spacing(2)
  },
  button: {
    textTransform: 'none',
    marginBottom: theme.spacing(1)    
  }
}))

const CertificateView = (props) => {

  const classes = useStyles()

  const { certificates } = props

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
          <Paper className={classes.root} elevation={3}>
          <Box display='flex' flexDirection='column' justifyContent='space-between' alignItems='center'>
            <Box>
              <Box textAlign='center'>
                <Typography variant="h4">
                  Certificados
                </Typography>
              </Box>                
              {certificates.length > 0 ? (
                 <List >                   
                    {certificates.map((certificate, index) => (
                      <CertificateCard key={index} certificate={certificate}/>
                      ))}
                 </List>
              ):(
                <Typography>
                  No has cargado certificados para esta area
                </Typography>
                )}
            </Box>
            <Dialog
              open={open}
              onClose={handleClose}>
                <DialogTitle align="center">
                  <Typography variant="h4">Agregar certificado</Typography>
                </DialogTitle>
                <CertificateDialog add={true} close={handleClose}/>
            </Dialog>
            <Box className={classes.button}>
                <Button
                variant="contained"
                color="primary"
                component="span"
                onClick={handleOpen}
                endIcon={<AddCircleIcon />}>
                Agregar
              </Button>
            </Box>
            </Box>
          </Paper>
    </>
  )
}

const mapStateToProps = (state) => ({
  certificates : state.certificates.certificateslist
})

export default connect(mapStateToProps, {
})(CertificateView)

