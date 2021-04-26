import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import TutorTopBar from './TopBar'

import { getTutorInfo } from 'src/redux/actions/tutor_data'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    overflow: 'auto'
  },
  contentContainer: {
    display: 'flex',
    overflow: 'hidden'    
  },
  content: {
    flex: '1 1 auto',
    overflow: 'hidden',
    marginRight: theme.spacing(3)
  }
}))

const TutorLayout = (props) => {
  const classes = useStyles()
  const {getTutorInfo, user} = props
  useEffect(
    () => {
      getTutorInfo(user.id)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [])

  return (
    <div className={classes.root}>
      <TutorTopBar />  
        <div className={classes.contentContainer}>   
          <div className={classes.content}>          
            <Outlet />
          </div>
        </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

export default connect(mapStateToProps, {
  getTutorInfo
})(TutorLayout)