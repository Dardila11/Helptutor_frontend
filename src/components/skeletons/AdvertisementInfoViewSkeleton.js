import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme)=>({
    root:{
        margin: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}))

const AdvertisementInfoViewSkeleton = () => {
    const classes = useStyles()
    return (
        <Box className={classes.root}>
                <Skeleton variant="text" width={100}/>
                <Skeleton variant="rect" width={580} height={110} />
                <Skeleton variant="text" width={525} />
                <Skeleton variant="rect" width={500} height={110} />
        </Box>
    )
}

export default AdvertisementInfoViewSkeleton