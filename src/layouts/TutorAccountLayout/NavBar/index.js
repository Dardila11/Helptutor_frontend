import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles, Typography } from '@material-ui/core'
import {
  Avatar,
  Card,
  Grid,
  List,
  ListItem,
  ListItemText,
  Box
} from '@material-ui/core'
import { useAuthState } from 'src/context/context'

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: '1rem',
    width: theme.spacing(18),
    height: theme.spacing(18),
    color: theme.palette.getContrastText('#1769aa'),
    backgroundColor: '#1769aa'
  },
  nav: {
    borderRadius: '20px',
    overflow: 'initial'
  }
}))

const NavBar = () => {
  const classes = useStyles()
  const user = useAuthState().user
  return (
    <Card className={classes.nav}>
      <Box display="flex" justifyContent="center">
        <Avatar className={classes.avatar} alt="my-avatar" src={user.photo}>
          <Typography variant="h1">
            <b>{user.first_name[0]}</b>
          </Typography>
        </Avatar>
      </Box>
      <List>
        <ListItem component={RouterLink} to="/tutor/cuenta/perfil" button>
          <i className="fas fa-user icon-menu"></i>
          <ListItemText primary="Ver perfil" />
        </ListItem>
        <ListItem component={RouterLink} to="/tutor/cuenta/informacion" button>
          <i className="fas fa-user-edit icon-menu"></i>
          <ListItemText primary="Editar información" />
        </ListItem>
        <ListItem
          component={RouterLink}
          to="/tutor/cuenta/especialidades"
          button>
          <i className="fas fa-briefcase icon-menu"></i>
          <ListItemText primary="Areas de conocimento" />
        </ListItem>
        <ListItem component={RouterLink} to="/tutor/cuenta/servicios" button>
          <i className="fas fa-briefcase icon-menu"></i>
          <ListItemText primary="Servicios" />
        </ListItem>
        <ListItem component={RouterLink} to="/tutor/cuenta/horario" button>
          <i className="fas fa-calendar-alt icon-menu"></i>
          <ListItemText primary="Horario" />
        </ListItem>
      </List>
    </Card>
  )
}

export default NavBar
