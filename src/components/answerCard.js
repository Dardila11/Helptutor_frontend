import React from 'react'
import { Avatar, Grid, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    coverAnswer: {
        width: 40,
        height: 40
    },
    answer: {
        marginBlockEnd: theme.spacing(2)
    }
}))

const AnswerCard = (props) => {
    const classes = useStyles()
    const {answer} = props
    return (
        <>
            <Grid item xs={1}>
                <Avatar className={classes.coverAnswer} alt='user photo' src='/static/images/avatars/avatar_6.png'/>
            </Grid>
            <Grid className={classes.answer} item xs={11}>
                <Typography lineheight={1} variant='h6'>
                    <b>Username</b>
                </Typography>
                <Typography variant='h6'>
                    {answer.description}
                </Typography>
            </Grid>
        </>
    )
}

  
  export default AnswerCard