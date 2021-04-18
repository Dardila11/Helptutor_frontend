import React from 'react'
import {
  makeStyles,
  Toolbar,
  IconButton,
  Typography
} from '@material-ui/core'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
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

const StudentNavBar = () => {
  const classes = useStyles()
  return (
      <Toolbar className={classes.toolbar}>        
      <RouterLink to='/estudiante/publicaciones'>
        <IconButton className={classes.options}>
            <Typography variant='h4' >Publicaciones</Typography>
            <LibraryBooksIcon className={classes.navicons} />
        </IconButton>
      </RouterLink>
      <RouterLink to='tutors'>
        <IconButton className={classes.options}>
            <Typography variant='h4' >Tutores</Typography>
            <PeopleAltIcon className={classes.navicons}/>
        </IconButton>
      </RouterLink>
      <RouterLink to='/estudiante/cuenta/perfil'>
        <IconButton className={classes.options}>
            <Typography variant='h4'>Perfil</Typography>
            <AccountBoxIcon className={classes.navicons}/>
        </IconButton>
       </RouterLink>
      </Toolbar>
  )
}

export default StudentNavBar
