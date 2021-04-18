import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import {
  Avatar,
  Card,
  Grid,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(18),
    height: theme.spacing(18),
    margin: theme.spacing(2),
    marginLeft: theme.spacing(6)
  },
  nav: {
    width: theme.spacing(30),
    height: theme.spacing(55),
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    borderRadius: '20px'
  }
}))

const NavBar = () => {
  const classes = useStyles()
  return (
    <Card className={classes.nav} xs={3}>
      <Grid display="flex" flex="column">
        <Avatar
          className={classes.avatar}
          alt="my-avatar"
          src="/static/images/avatars/avatar_6.png"
        />
        <List>
          <ListItem component={RouterLink} to="/estudiante/cuenta/perfil" button>
            <ListItemText primary="Ver Perfil" />
          </ListItem>
          <ListItem
            component={RouterLink}
            to="/estudiante/cuenta/informacion"
            button>
            <ListItemText primary="Editar Información" />
          </ListItem>
        </List>
      </Grid>
    </Card>
  )
}

export default NavBar
