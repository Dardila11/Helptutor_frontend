import { Box, makeStyles } from '@material-ui/core'
import React from 'react'
import MeetNofifications from 'src/components/meet/notifications'
import MeetOptions from 'src/components/meet/options'
import MeetVideo from 'src/components/meet/video'
import { ContextProvider } from 'src/SocketContext'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },

}))

const MeetView = () => {
    const classes = useStyles()
    return (
        <ContextProvider>
            <Box className={classes.root}>
                <MeetVideo />
                <MeetOptions>
                    <MeetNofifications/>
                </MeetOptions>
            </Box>
        </ContextProvider>
    )
}

export default MeetView