import { Box, makeStyles } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'
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

const MeetView = (props) => {
    const classes = useStyles()
    const { user } = props
    return (
        <ContextProvider>
            <Box className={classes.root}>
                <MeetVideo user={user}/>
                <MeetOptions>
                    <MeetNofifications/>
                </MeetOptions>
            </Box>
        </ContextProvider>
    )
}
const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps, {
})(MeetView)