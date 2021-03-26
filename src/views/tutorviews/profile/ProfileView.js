import React from 'react'
import { Card, Divider, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '800px',
    padding: '20px',
    borderRadius: '20px'
  }
}))

const ProfileView = () => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <h1> Tutor Name </h1>
      <h3> Tutor </h3>
      <Divider />
    </Card>
  )
}

export default ProfileView
