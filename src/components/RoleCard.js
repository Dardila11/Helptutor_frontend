import React from 'react'
import { makeStyles, Card, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: '170px',
    padding: theme.spacing(2),
    borderRadius: '10px',
    backgroundColor: '#DFE1E1'
  },
  activeColor: {
    minWidth: '170px',
    padding: theme.spacing(2),
    marginRight: theme.spacing(1),
    borderRadius: '10px',
    backgroundColor: '#005579',
    color: '#FFFFFF'
  }
}))

const RoleCard = ({ role, isSelected }) => {
  const classes = useStyles()

  return (
    <Card className={isSelected ? classes.activeColor : classes.card}>
      <Typography> {role} </Typography>
    </Card>
  )
}

export default RoleCard
