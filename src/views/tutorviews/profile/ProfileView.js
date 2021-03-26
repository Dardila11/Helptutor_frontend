import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {}
}))

const ProfileView = () => {
  const classes = useStyles()
  return (
    <div>
      <h1> Profile view </h1>
    </div>
  )
}

export default ProfileView
