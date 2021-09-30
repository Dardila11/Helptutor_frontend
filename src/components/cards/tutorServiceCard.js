import React from 'react'
import {
  Avatar,
  Box,
  CardActionArea,
  Container,
  Dialog,
  Grid,
  Paper,
  Typography,
  CardContent,
  makeStyles
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import ServiceSelectionView from 'src/views/studentviews/tutors/serviceSelectionView'
import { capitalize, isUndefined } from 'lodash-es'

const useStyles = makeStyles((theme) => ({
  userSpace: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(1)
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
  methodology: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2)
  },
  price: {
    color: '#1ad41a',
    marginTop: theme.spacing(2),
    textAlign: 'center'
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
                src={props.service.tutor.user.photo}
              />
              <Typography>
                <b>{capitalize(props.service.tutor.user.first_name)} {capitalize(props.service.tutor.user.last_name)}</b>
              </Typography>
              <Rating name="read-only" size="small" value={props.service.tutor.score} readOnly />
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Container className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  <Box fontWeight="fontWeightBold">
                  {isSearch && !isUndefined(query)? getHighlightedText(service.title): service.title}
                    </Box>
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                {isSearch && !isUndefined(query)? getHighlightedText(service.description): service.description}
                </Typography>
              </CardContent>
            </Container>
          </Grid>
          <Grid item xs={3}>
            <Container className={classes.price}>
              <Typography variant="subtitle1" color="textSecondary">
                <b>Costo por hora</b>
              </Typography>
              <Typography variant="h4">${service.price}</Typography>
            </Container>
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
        <ServiceSelectionView onClose={handleClose} tutorInfo={service.tutor} service={service}/>
      </Dialog>
    </Paper>
  )
}

export default TutorServiceCard
