import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import {
  Avatar,
  Box,
  Container,
  Grid,
  Paper,
  IconButton
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import ChatIcon from '@material-ui/icons/Chat';
import { isUndefined } from 'lodash-es'
import Videocam from '@material-ui/icons/Videocam'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  userSpace: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
    
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: 60,
    height: 60
  },
  paper: {
    display: 'flex',
    minHeight: '150px',
    height: 'auto',
    borderRadius: '20px',
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  },
  price: {
    color: '#1ad41a',
    marginTop: theme.spacing(2),
    textAlign: 'center'
  },
  options: {
  }
}))

const ConsultancieCardStudent = (props) => {
  const { aggrement, isSearch, query} = props
  const classes = useStyles()
  console.log(aggrement)
  const getHighlightedText = (text) => {
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return <span> { parts.map((part, i) => 
        <span key={i} 
          style={part.toLowerCase() === query.toLowerCase() ? { fontWeight: 'bold', color: '#2979ff' } : {} }
        >
            { part }
        </span>)
    } </span>
  }
  
  return (
    <Paper className={classes.paper} elevation={3}>
        <Grid className={classes.container} container>
          <Grid item xs={2}>
            <Box className={classes.userSpace}>
              <Avatar
                className={classes.cover}
                alt="user photo"
                src={aggrement.service.tutor.user.photo}
              />
              <Typography variant='h5'>
                <b>{aggrement.service.tutor.user.first_name} {aggrement.service.tutor.user.last_name}</b>
              </Typography>
              <Rating name="read-only" size="small" value={aggrement.service.tutor.score} readOnly />
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Container className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  <Box fontWeight="fontWeightBold">
                  {isSearch && !isUndefined(query)? getHighlightedText(aggrement.service.title): aggrement.service.title}
                    </Box>
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                {aggrement.service.description}
                </Typography>
              </CardContent>
            </Container>
          </Grid>
          <Grid className={classes.options} item xs={3}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center">
              <Typography color="textSecondary">
                <b>Opciones</b>
              </Typography>
              <Box spacing={3}>
                  <IconButton color="primary">
                    <Videocam />
                  </IconButton>
                <IconButton color="primary" >
                  <ChatIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
    </Paper>
  )
}

export default ConsultancieCardStudent
