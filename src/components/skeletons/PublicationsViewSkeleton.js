import React from 'react'
import { Skeleton } from '@material-ui/lab'

const PublicationsViewSkeleton = () => {
  return (
    <>
      <Skeleton variant="text" />
      <Skeleton variant="rect" width={150} height={100} />
      <Skeleton variant="text" />
    </>
  )
}

export default PublicationsViewSkeleton
