import React from 'react'
import { Skeleton } from '@material-ui/lab'

const ProfileViewSkeleton = () => {
    return (
        <>
        <Skeleton variant="text" />
        <Skeleton variant="rect" width={150} height={100} />
        <Skeleton variant="text" />
        </>
    )
}

export default ProfileViewSkeleton