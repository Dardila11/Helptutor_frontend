import React from 'react'

import LinearProgress from '@material-ui/core/LinearProgress'
import { useAuthState } from 'src/context'

function ProgressAction() {
  const { isRunning } = useAuthState()
  return (
    <div
      style={{
        display: isRunning ? 'block' : 'none',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 9999
      }}>
      <LinearProgress />
    </div>
  )
}

export default ProgressAction
