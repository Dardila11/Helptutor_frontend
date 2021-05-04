import React from 'react'
import { useNavigate } from 'react-router-dom'

//MATERIAL UI
import {
  Backdrop,
  Box,
  Card,
  CardActionArea,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography
} from '@material-ui/core'

//REDUX
import { connect } from 'react-redux'
import { selectRole } from 'src/redux/actions/auth'
import Page from 'src/components/Page'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.common.white
  },
  container: {
    margin: theme.spacing(1),
    borderRadius: '20px',
    backgroundColor: '#1190CB'
  },
  action: {
    height: 200,
    width: 200
  }
}))

const SelectRoleView = (props) => {
  const classes = useStyles()
  const { selectRole } = props
  const navigate = useNavigate()

  const handleTutor = () => {
    selectRole('tutor')
    navigate('/tutor')
  }

  const handleStudent = () => {
    selectRole('student')
    navigate('/estudiante')
  }
  return (
    <Page title="Seleccion de rol">
      <Backdrop className={classes.backdrop} open={true}>
        <Dialog open={true}>
          <DialogTitle align="center">
            <Typography>Continuar como</Typography>
          </DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Card className={classes.container} elevation={3}>
                <CardActionArea
                  className={classes.action}
                  onClick={handleTutor}>
                  <Typography variant="h3">
                    <Box textAlign="center" color="white">
                      Tutor
                    </Box>
                  </Typography>
                </CardActionArea>
              </Card>
              <Card className={classes.container} elevation={3}>
                <CardActionArea
                  className={classes.action}
                  onClick={handleStudent}>
                  <Typography variant="h3">
                    <Box textAlign="center" color="white">
                      Estudiante
                    </Box>
                  </Typography>
                </CardActionArea>
              </Card>
            </Box>
          </DialogContent>
        </Dialog>
      </Backdrop>
    </Page>
  )
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, {
  selectRole
})(SelectRoleView)
