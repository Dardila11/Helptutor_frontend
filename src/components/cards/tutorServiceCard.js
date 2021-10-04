import React from 'react'
import {
  Avatar,
  Box,
  CardActionArea,
  Dialog,
  Grid,
  Paper,
  Typography,
  makeStyles
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import ServiceSelectionView from 'src/views/studentviews/tutors/serviceSelectionView'
import { capitalize, isUndefined } from 'lodash-es'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    height: 'auto',
    borderRadius: '20px',
    margin: theme.spacing(3),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
  },
  userSpace: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
  },
  cover: {
    width: 60,
    height: 60
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  price: {
    color: '#1ad41a',
    textAlign: 'center',
    alignSelf: 'center'
  }
}))

const TutorServiceCard = (props) => {
  const { service, isSearch, query } = props
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const getHighlightedText = (text) => {
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return <span> {parts.map((part, i) =>
      <span key={i}
        style={part.toLowerCase() === query.toLowerCase() ? { fontWeight: 'bold', color: '#2979ff' } : {}}
      >
        {part}
      </span>)
    } </span>
  }

  return (
    <Paper className={classes.paper} elevation={3}>
      <CardActionArea className={classes.cardAction} onClick={handleOpen}>
          <Grid container className={classes.container}>
            {/* Photo, name and Rating */}
            <Grid item xs={2}>
              <Box className={classes.userSpace}>
                <Avatar
                  className={classes.cover}
                  alt="user photo"
                  src={props.service.tutor.user.photo}
                />
                <Typography>
                  <b>{capitalize(props.service.tutor.user.first_name)} {capitalize(props.service.tutor.user.last_name)}</b>
                </Typography>
                <Rating name="read-only" size="small" value={props.service.tutor.score} readOnly />
              </Box>
            </Grid>
            {/* Title and Description */}
            <Grid item xs={7}>
              <Box className={classes.details}>
                  <Typography component="h5" variant="h5">
                    <Box fontWeight="fontWeightBold">
                      {isSearch && !isUndefined(query) ? getHighlightedText(service.title) : service.title}
                    </Box>
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {isSearch && !isUndefined(query) ? getHighlightedText(service.description) : service.description}
                  </Typography>
              </Box>
            </Grid>
            {/* Price */}
            <Grid item xs={3}>
              <Box className={classes.price}>
                <Typography component="h5" variant="h5" color="textSecondary">
                  <b>Costo por hora</b>
                </Typography>
                <Typography variant="h4">${service.price}</Typography>
              </Box>
            </Grid>
          </Grid>
      </CardActionArea>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth={true}
        scroll="paper"
        aria-labelledby="tutorSelection-dialog-title">
        <ServiceSelectionView onClose={handleClose} tutorInfo={service.tutor} service={service} />
      </Dialog>
    </Paper>
  )
}

export default TutorServiceCard
