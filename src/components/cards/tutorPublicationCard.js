import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import {
  Avatar,
  Box,
  CardActionArea,
  Chip,
  Dialog,
  Grid,
  Paper
} from '@material-ui/core'
import NominationView from 'src/views/tutorviews/publications/nomination'
import { isUndefined } from 'lodash-es'
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
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
  options: {
    marginTop: theme.spacing(2)
  },
  userSpace: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  }
}))

const TutorPublicationCard = (props) => {
  const { publication, nomination, isSearch, query } = props
  let opNomination = isUndefined(nomination)
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

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
      <CardActionArea className={classes.cardAction} onClick={handleOpen}>
        <Grid container>
        <Grid item xs={2}>
            <Box className={classes.userSpace}>
              <Avatar
                className={classes.cover}
                alt="user photo"
                src="/static/images/avatars/avatar_6.png"
              />
              <Typography>
                <b>Username</b>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={opNomination ? 10 : 7}>
            <Box className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  <Box fontWeight="fontWeightBold">
                  {isSearch && !isUndefined(query)? getHighlightedText(publication.title): publication.title}
                    </Box>
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {isSearch && !isUndefined(query)? getHighlightedText(publication.description): publication.description}
                </Typography>
              </CardContent>
            </Box>
          </Grid>
          {opNomination ? (
            <></>
          ) : (
            <Grid item xs={3}>
              <Chip label={<Typography>Ya te postulaste</Typography>} color='primary' icon={<DoneIcon />} clickable/>
            </Grid>
          )}
        </Grid>
      </CardActionArea>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="tutorSelection-dialog-title">
        <NominationView
          publication={publication}
          closeDialog={handleClose}
          nomination={nomination}
        />
      </Dialog>
    </Paper>
  )
}

export default TutorPublicationCard
