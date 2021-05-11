import { Box, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import Page from 'src/components/Page'
import Schedule from 'src/components/Schedule/Schedule'

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(1),
        width: 900,
        borderRadius: '20px'
    },
    title: {
        margin: theme.spacing(1)
    }
}))

const TutorScheduleView = () => {

    const classes = useStyles()
    return (
        <Page title='Horario'>
            <Box display='flex' flexDirection='column' justifyContent='center' textAlign='center'>
                <Paper className={classes.root} elevation={3}>
                <Typography className={classes.title} variant='h3'>
                    Mi horario
                </Typography>
                </Paper>
            </Box>
            <Schedule/>
        </Page>
    )
}

export default TutorScheduleView