import React from 'react'
import { useNavigate } from 'react-router-dom'

//MATERIAL UI
import { Box, Button, Dialog, DialogContent, DialogTitle, Typography } from '@material-ui/core'

//REDUX
import { connect } from 'react-redux'
import { selectRole } from 'src/redux/actions/auth'
import Page from 'src/components/Page'

const SelectRoleView = (props) => {
    let navigate = useNavigate()
    const { selectRole } = props
    const [open, setOpen] = React.useState(true)
    const [role, setRole] = React.useState('')

    console.log('into Role view')
    const handleClose = (option) => {
        selectRole(option)
        if(option==='tutor') setRole('/tutor')
        if(option==='student') setRole('/estudiante')
        setOpen(false)
    }
    return (
        <Page title='Seleccion de rol'>
            <Dialog open={open}>
            <DialogTitle>
                <Typography>
                    Iniciar sesion como
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box display='flex' flexDirection='row' alignItems='center'> 
                    <Button onClick={handleClose('tutor')} variant='outlined' color='primary'>
                        Tutor
                    </Button>
                    <Button onClick={handleClose('student')} variant='outlined' color='primary'>
                        Estudiante
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
      </Page>
      )
}

const mapStateToProps = (state) => ({
  })

export default connect(mapStateToProps, {
    selectRole
  })(SelectRoleView)