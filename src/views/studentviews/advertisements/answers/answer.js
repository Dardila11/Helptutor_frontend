import React, { useEffect } from 'react'
import { Avatar, DialogContent, DialogTitle, Grid, makeStyles, Typography } from '@material-ui/core'
import AnswerFormView from './answerForm'

//REDUX
import { getAdvertisementAnswers } from 'src/redux/actions/advertisements'
import { connect } from 'react-redux'
import { getStudent } from 'src/redux/actions/advertisements'

const useStyles = makeStyles((theme) => ({
    cover: {        
        width: 80,
        height: 80
    },
    coverAnswer: {
        width: 40,
        height: 40
    },
    answersTitle: {
        marginBlock: theme.spacing(1)
    }
}))

const AnswerView = (props) => {
    const {answers, getAdvertisementAnswers, getStudent, advertisement, studentAd} = props
    const classes = useStyles()

    useEffect(()=>{
        getAdvertisementAnswers(advertisement.id)
        getStudent(advertisement.student)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [])
    console.log(advertisement)
    console.log(answers)
    console.log(answers.length)
    return (        
            <>
                <DialogTitle id='publications-dialog-title' align='center'>
                    <Typography> ANUNCIO</Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container>
                                <Grid item xs={3}>
                                    <Avatar className={classes.cover} alt='user photo' src='/static/images/avatars/avatar_6.png'/>
                                    <Typography variant='h6'>
                                        <b>{studentAd.user.first_name} {studentAd.user.last_name}</b>
                                    </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography>
                                        <b>{advertisement.title}</b>
                                    </Typography>
                                    <Typography>
                                        {advertisement.description}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <AnswerFormView />
                                </Grid>
                                {answers.length > 0 ? 
                                (
                                    <Grid container>
                                        <Grid className={classes.answersTitle} item xs={12}>
                                            <Typography variant='h6'>
                                                Respuestas
                                            </Typography>
                                        </Grid>
                                        {answers.map((answer, index) =>(
                                            <>
                                            <Grid item xs={1}>
                                                <Avatar className={classes.coverAnswer} alt='user photo' src='/static/images/avatars/avatar_6.png'/>
                                            </Grid>
                                            <Grid item xs={11}>
                                                <Typography variant='h5'>
                                                    {answer.description}
                                                </Typography>
                                            </Grid>
                                            </>
                                        ))}
                                    </Grid>
                                )
                                :
                                (<></>)}                 
                    </Grid>
                </DialogContent>
            </>                
    )
}

const mapStateToProps = (state) => ({
    answers: state.advertisements.advertisement.answers,
    studentAd: state.advertisements.advertisement.student
  })
  
  export default connect(mapStateToProps, {
    getAdvertisementAnswers,
    getStudent
  })(AnswerView)