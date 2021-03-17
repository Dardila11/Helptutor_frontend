import React from 'react'
import {
  makeStyles,
  Toolbar,
  IconButton,
  Container,
  Paper,
  Typography
} from '@material-ui/core'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    marginBlockEnd: theme.spacing(2),
    justifyContent: 'space-between',
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
    <Container className={classes.root} float='center'>
      <Paper elevation={3}>
      <Toolbar className={classes.toolbar} float='center'>        
      <RouterLink to='news'>
        <IconButton>
            <Typography variant='h4'>Noticias</Typography>
            <LibraryBooksIcon className={classes.navicons} />
        </IconButton>
      </RouterLink>
      <RouterLink to='offers'>
        <IconButton>
            <Typography variant='h4'>Ofertas</Typography>
            <ListAltIcon className={classes.navicons}/>
        </IconButton>
      </RouterLink>
      <RouterLink to='profile'>
        <IconButton>
            <Typography variant='h4'>Perfil</Typography>
            <AccountBoxIcon className={classes.navicons}/>
        </IconButton>
       </RouterLink>
      </Toolbar>
      </Paper>
    </Container>
  )
}

export default TutorNavBar
