import React, { useEffect } from 'react'
import { Avatar, Box, DialogTitle, Grid, makeStyles, Typography } from '@material-ui/core'
import AnswerFormView from './answerForm'

//REDUX
import { getAdvertisementAnswers } from 'src/redux/actions/advertisements'
import { connect } from 'react-redux'
import { getStudent } from 'src/redux/actions/advertisements'
import AnswerCard from 'src/components/answerCard'

const useStyles = makeStyles((theme) => ({
    cover: {        
        width: 70,
        height: 70
    },
    answersTitle: {
        marginBlock: theme.spacing(1)
    },
    answers: {
        marginLeft: theme.spacing(2)
    },
    content: {
        marginTop: '0px',
        margin: theme.spacing(2)
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
    return (        
            <>
                <DialogTitle id='publications-dialog-title' align='center'>
                    <Typography><b>ANUNCIO</b></Typography>
                </DialogTitle>
                <Box className={classes.content}>
                    <Grid container>
                                <Grid item xs={2}>
                                    <Box align='left'>
                                        <Avatar className={classes.cover} alt='user photo' src='/static/images/avatars/avatar_6.png'/>
                                    </Box>
                                    <Typography variant='h6'>
                                        <Box textAlign='left'>
                                            <b>{studentAd.user.first_name} {studentAd.user.last_name}</b>
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={10}>
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
                                (<>
                                    <Grid className={classes.answersTitle} item xs={12}>
                                            <Typography variant='h6'>
                                                Respuestas
                                            </Typography>
                                    </Grid>
                                    <Grid className={classes.answers} container>
                                        {answers.map((answer, index) =>(
                                            <AnswerCard id={index} answer={answer}/>
                                        ))}
                                    </Grid>
                                </>
                                )
                                :
                                (<></>)}                 
                    </Grid>
                </Box>
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