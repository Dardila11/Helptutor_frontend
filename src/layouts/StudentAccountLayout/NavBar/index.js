import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Avatar,
  Card,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography
} from '@material-ui/core'
import { useAuthState } from 'src/context/context'

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(18),
    height: theme.spacing(18),
    margin: theme.spacing(2),
    marginLeft: theme.spacing(6),
    color: theme.palette.getContrastText('#1769aa'),
    backgroundColor: '#1769aa'
  },
  nav: {
    width: theme.spacing(30),
    height: theme.spacing(55),
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    borderRadius: '20px',
    overflow: 'initial'
  }
}))

const NavBarStudent = () => {
  const classes = useStyles()
  const user = useAuthState().user
  return (
    <Card className={classes.nav} xs={3}>
      <Grid display="flex" flex="column">
        <Avatar
          className={classes.avatar}
          alt="my-avatar"
          src={user.photo}>
          <Typography variant="h1">
            <b>{user.first_name[0]}</b>
          </Typography>
        </Avatar>
        <List>
          <ListItem
            component={RouterLink}
            to="/estudiante/cuenta/informacion"
            button>
            <ListItemText primary="Editar Información" />
          </ListItem>
          <ListItem component={RouterLink} to="/estudiante/cuenta" button>
            <ListItemText primary="Historial de pagos" />
          </ListItem>
        </List>
      </Grid>
    </Card>
  )
}

export default NavBarStudent
