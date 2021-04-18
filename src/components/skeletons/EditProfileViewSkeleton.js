import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Box, Divider, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
    },
    title: {
        marginTop: theme.spacing(2),
        marginBlock: theme.spacing(2)
    },
    divider: {
        marginLeft: theme.spacing(2),
        marginRigth: theme.spacing(2)
    }
  }))

const EditProfileViewSkeleton = () => {
    const classes = useStyles()

    return (
        <>
        <Box display="flex" flexDirection="column" justifyContent="center">
            <Box className={classes.title}>
                <Skeleton variant="text" />
            <Box/>
            <Box display='flex'>
                <Skeleton variant="rect" width={300} height={100} />
                <Divider className={classes.divider}/>
                <Skeleton variant="rect" width={300} height={100} />
                <Divider className={classes.divider}/>
                <Skeleton variant="rect" width={300} height={100} />
            </Box>        
            </Box>
                <Skeleton variant="text" />
            </Box>
        </>
    )
}

export default EditProfileViewSkeleton