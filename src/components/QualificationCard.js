import React from 'react'
import { Avatar, Box, Card, CardContent, makeStyles, Typography } from '@material-ui/core'
import { Rating } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
    root:{},
    cover:{
        width: 30,
        height: 30
    }
}
))

const QualificationCard = (props) => {

    const classes = useStyles()
    return (
        <Card>
            <CardContent>
                    <Box display='flex' flexDirection='row' alignItems='center' >
                        <Avatar className={classes.cover} alt="user photo" src="/static/images/avatars/avatar_6.png"/>
                        <Box>
                            <Typography variant='h6'>
                                <b>username</b>
                            </Typography>
                            <Rating value={5} size='small' readOnly/>  
                        </Box>
                    </Box>
                    <Box textAlign='justify'>
                        <Typography variant='h6'>
                            Muy buen profesor, siempre trata de ir al nivel y ritmo que uno desea
                        </Typography>
                    </Box>
            </CardContent>
        </Card>
    )
}

export default QualificationCard