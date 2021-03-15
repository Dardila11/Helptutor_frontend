import React, { useState } from 'react'
import {
  Avatar,
  Card,
  Box,
  makeStyles,
  ListItem,
  ListItemIcon
} from '@material-ui/core'

import { Visibility } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '350px',
    padding: '20px',
    borderRadius: '20px'
  },
  avatar: {
    cursor: 'pointer',
    width: 128,
    height: 128
  }
}))

const NavBar = () => {
  const classes = useStyles()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
  }
  const content = []
  return (
    <Box display="flex" flexDirection="column" mr={5}>
      <Card className={classes.root}>
        <Avatar className={classes.avatar} mb={2} />
        <ListItem button onClick={(event) => handleListItemClick(event, 0)}>
          <ListItemIcon>
            <Visibility />
          </ListItemIcon>
          <span>Ver Perfil</span>
        </ListItem>
        <ListItem button onClick={(event) => handleListItemClick(event, 0)}>
          <ListItemIcon></ListItemIcon>
        </ListItem>
        <ListItem button onClick={(event) => handleListItemClick(event, 0)}>
          <ListItemIcon></ListItemIcon>
        </ListItem>
      </Card>
    </Box>
  )
}

export default NavBar
