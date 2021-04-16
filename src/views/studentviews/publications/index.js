import React, { useEffect } from 'react'
import { Box, Card, makeStyles, Paper, Typography } from '@material-ui/core'

import { getStudentInfo } from 'src/redux/actions/student_data'
import { connect } from 'react-redux'
import PublicationsViewSkeleton from 'src/components/skeletons/PublicationsViewSkeleton'
import SearchBar from 'src/components/SearchBar'
import PublicationFormView from './publicationForm'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    borderRadius: '20px',
    width: 900
  },
  cardsContent: {
      margin: theme.spacing(2),
      borderRadius:'20px'
  },
  title:{
      margin: theme.spacing(1)
  }
}))

const StudentPublicationsView = (props) => {
  const classes = useStyles()
  const {user, requestInProgress, getStudentInfo} = props
  useEffect(
    () => {
      getStudentInfo(user.id)
    })

  return (
      <Box display='flex' flexDirection="column" justifyContent='center' alignItems='center'>
        <SearchBar />
        <Paper elevation={3} className={classes.root}>
        {requestInProgress? (
            <PublicationsViewSkeleton />
        ):(
            <>
                <Box className={classes.title} textAlign='center'>
                    <Typography variant='h4'>
                    MIS PUBLICACIONES
                    </Typography>
                </Box>
                <PublicationFormView/>
                <Box>
                    <Card className={classes.cardsContent}>
                        Here publications cards
                    </Card>
                </Box>
            </>
        )}
        </Paper>
    </Box>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  requestInProgress: state.studentInfo.requestInProgress
})

export default connect(mapStateToProps, {
  getStudentInfo
})(StudentPublicationsView)
