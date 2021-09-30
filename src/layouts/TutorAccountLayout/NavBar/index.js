import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles, Typography } from '@material-ui/core'
import {
  Avatar,
  Card,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@material-ui/core'
import { useAuthState } from 'src/context/context'

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    margin: theme.spacing(2),
    color: theme.palette.getContrastText('#1769aa'),
    backgroundColor: '#1769aa'
  },
  nav: {
    borderRadius: '20px',
    overflow: 'initial'
  },
  menu: {
    padding: theme.spacing(2)
  }
}))

const NavBarTutor = () => {
  const classes = useStyles()
  const { user } = useAuthState()
  return (
    <Card className={classes.nav}>
      <Box display="flex" justifyContent="center">
        <Avatar className={classes.avatar} alt="my-avatar" src={user.photo}>
          <Typography variant="h1">
            <b>{user.first_name[0]}</b>
          </Typography>
        </Avatar>
      </Box>
      <Divider />
      <List className={classes.menu}>
        <ListItem component={RouterLink} to="/tutor/cuenta/perfil" button>
          <ListItemText primary="Ver Perfil" />
        </ListItem>
        <ListItem component={RouterLink} to="/tutor/cuenta/informacion" button>
          <ListItemText primary="Editar Información" />
        </ListItem>
        <ListItem
          component={RouterLink}
          to="/tutor/cuenta/especialidades"
          button>
          <ListItemText primary="Areas de conocimento" />
        </ListItem>
        <ListItem component={RouterLink} to="/tutor/cuenta/servicios" button>
          <ListItemText primary="Servicios" />
        </ListItem>
        <ListItem component={RouterLink} to="/tutor/cuenta/horario" button>
          <ListItemText primary="Horario" />
        </ListItem>
      </List>
    </Card>
  )
}

export default NavBarTutor
