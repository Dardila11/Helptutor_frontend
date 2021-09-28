import React from 'react'
import { makeStyles, Toolbar, Typography, Button, createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import ListAltIcon from '@material-ui/icons/ListAlt'
import ClassIcon from '@material-ui/icons/Class'
import { Link as RouterLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {},
  toolbar: {
      backgroundColor: '#ffff',
      justifyContent: 'center'
  },
  primaryColor: {
    color : theme.palette.primary.main
  },
  option:{
    width: 10
  },
  button:{
    width: 250
  },
  optionSelected: {
    width: 250,
    borderBottom: '4px solid #bbdefb',
  }
}))

const theme = createMuiTheme({
  typography: {
    button: {
      textTransform: "none"
    }
  }
})

const TutorNavBar = () => {
  const classes = useStyles()
  const [selected, setSelected ] = React.useState(1)

  const navOptions = [
    {
      id: 1,
      title: 'Publicaciones',
      link: '/tutor/publicaciones',
      icon: <ListAltIcon className={classes.primaryColor}/>
    },
    {
      id:2,
      title: 'Asesorias',
      link: '/tutor/publicaciones',
      icon: <ClassIcon className={classes.primaryColor} />
    }
  ]
  return (
    <Toolbar className={classes.toolbar} color="primary" variant="dense">
      {navOptions.map((element, index) => (
          <RouterLink key={index} to={element.link} onClick={ () => {setSelected(element.id)}}>
            <MuiThemeProvider theme={theme}>
              <Button className={element.id===selected? classes.optionSelected : classes.button} >
                {element.icon}
                <Typography variant='h6' className={classes.primaryColor}>{element.title}</Typography>
              </Button>
            </MuiThemeProvider>
          </RouterLink>
      ))}
    </Toolbar>
  )
}

export default TutorNavBar
