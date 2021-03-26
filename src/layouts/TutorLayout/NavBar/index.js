import React from 'react'
import {
  makeStyles,
  Toolbar,
  IconButton,
  Typography
} from '@material-ui/core'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    
  },
  toolbar:{
    alignItems: 'center'
  },
  navicons:{
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}))

const TutorNavBar = () => {
  const classes = useStyles()
  return (
      <Toolbar className={classes.toolbar}>        
      <RouterLink to='news'>
        <IconButton>
            <Typography variant='h4' color='initial'>Noticias</Typography>
            <LibraryBooksIcon className={classes.navicons} />
        </IconButton>
      </RouterLink>
      <RouterLink to='offers'>
        <IconButton>
            <Typography variant='h4' color='initial'>Ofertas</Typography>
            <ListAltIcon className={classes.navicons}/>
        </IconButton>
      </RouterLink>
      <RouterLink to='/tutor/account/ProfileView'>
        <IconButton>
            <Typography variant='h4' color='initial'>Perfil</Typography>
            <AccountBoxIcon className={classes.navicons}/>
        </IconButton>
       </RouterLink>
      </Toolbar>
  )
}

export default TutorNavBar
