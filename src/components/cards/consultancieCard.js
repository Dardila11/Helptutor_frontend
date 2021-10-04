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
  IconButton,
} from '@material-ui/core'
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
    height: 120,
    borderRadius: '20px',
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

const ConsultancieCard = (props) => {
  const { consultancie, isSearch, query, tutorInfo, serviceInfo } = props
  const classes = useStyles()

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
                src={tutorInfo.user.photo}
              />
              <Typography variant='h5'>
                <b>{tutorInfo.user.first_name} {tutorInfo.user.last_name}</b>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Container className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  <Box fontWeight="fontWeightBold">
                  {isSearch && !isUndefined(query)? getHighlightedText(serviceInfo.title): serviceInfo.title}
                    </Box>
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                {/* {consultancie.slot.day} de {consultancie.slot.start <= 12 ? consultancie.slot.start : consultancie.slot.start - 12}{' '}
                                  {consultancie.slot.start < 12 ? 'am' : 'pm'} a {consultancie.slot.end <= 12 ? consultancie.slot.end : consultancie.slot.end - 12}{' '}
                                  {consultancie.slot.end < 12 ? 'am' : 'pm'} */}
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

export default ConsultancieCard
