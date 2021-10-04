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
import { isUndefined } from 'lodash-es'
import AggrementView from 'src/views/tutorviews/services/aggrement'

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
  },
  is_accepted_student: {
    position: 'absolute',
    top: '-10px',
    right: '-10px',
    background: 'red',
    borderRadius: '50%',
    padding: theme.spacing(2)
  },
  is_accepted_tutor: {
    position: 'absolute',
    top: '-10px',
    right: '-10px',
    background: 'orange',
    borderRadius: '50%',
    padding: theme.spacing(2)
  },
  is_accepted_both: {
    position: 'absolute',
    top: '-10px',
    right: '-10px',
    background: 'green',
    borderRadius: '50%',
    padding: theme.spacing(2)
  },
  is_accepted_noboth: {
    position: 'absolute',
    top: '-10px',
    right: '-10px',
    background: 'white',
    borderRadius: '50%',
    padding: theme.spacing(2),
    border: '1px solid gray'
  },
  container: {
    padding: theme.spacing(2)
  }
}))

export default function TutorServiceCard1(props) {
  const { aggrement, isSearch, query } = props
  const { is_accepted_student: as, is_accepted_tutor: at } = aggrement
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const getHighlightedText = (text) => {
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return (
      <span>
        {' '}
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              part.toLowerCase() === query.toLowerCase()
                ? { fontWeight: 'bold', color: '#2979ff' }
                : {}
            }>
            {part}
          </span>
        ))}{' '}
      </span>
    )
  }

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Paper className={classes.paper} elevation={1}>
      <CardActionArea className={classes.cardAction} onClick={handleOpen}>
        <Grid container className={classes.container}>
          <Box
            className={
              as && at
                ? classes.is_accepted_both
                : at
                ? classes.is_accepted_tutor
                : as
                ? classes.is_accepted_student
                : classes.is_accepted_noboth
            }>
            OK
          </Box>
          <Grid item xs={2}>
            <Box className={classes.userSpace}>
              <Avatar
                className={classes.cover}
                alt="user photo"
                src={aggrement.student.user.photo}>
                <b>{aggrement.student.user.first_name[0]}</b>
              </Avatar>
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Container className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  <Box fontWeight="fontWeightBold">
                    {isSearch && !isUndefined(query)
                      ? getHighlightedText(aggrement.service.title)
                      : aggrement.service.title}
                  </Box>
                </Typography>
                <Typography>Estudiante</Typography>
                <Typography>
                  <b>
                    {aggrement.student.user.first_name}{' '}
                    {aggrement.student.user.last_name}
                  </b>
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {isSearch && !isUndefined(query)
                    ? getHighlightedText(aggrement.description)
                    : aggrement.description}
                </Typography>
              </CardContent>
            </Container>
          </Grid>
          <Grid item xs={3}>
            <Container className={classes.price}>
              <Typography variant="subtitle" color="textSecondary">
                <b>Contraoferta</b>
              </Typography>
              <Typography variant="h6">${aggrement.price}</Typography>
            </Container>
          </Grid>
        </Grid>
      </CardActionArea>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="tutorSelection-dialog-title">
        <AggrementView aggrement={aggrement} closeDialog={handleClose} />
      </Dialog>
    </Paper>
  )
}
