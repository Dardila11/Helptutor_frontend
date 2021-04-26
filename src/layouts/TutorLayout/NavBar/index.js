import React from 'react'
import {
  makeStyles,
  Toolbar,
  IconButton,
  Typography
} from '@material-ui/core'
import ListAltIcon from '@material-ui/icons/ListAlt';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    
  },
  toolbar:{
    alignItems: 'center',
    color: theme.palette.common.white
  },
  navicons:{
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  options:{
    color: theme.palette.common.white
  }
}))

const TutorNavBar = () => {
  const classes = useStyles()
  return (
      <Toolbar className={classes.toolbar}>
      <RouterLink to='/tutor/publicaciones'>
        <IconButton className={classes.options}>
            <Typography variant='h4' >Publicaciones</Typography>
            <ListAltIcon className={classes.navicons}/>
        </IconButton>
      </RouterLink>
      <RouterLink to='/tutor/cuenta/perfil'>
        <IconButton className={classes.options}>
            <Typography variant='h4'>Perfil</Typography>
            <AccountBoxIcon className={classes.navicons}/>
        </IconButton>
       </RouterLink>
      </Toolbar>
  )
}

export default TutorNavBar
