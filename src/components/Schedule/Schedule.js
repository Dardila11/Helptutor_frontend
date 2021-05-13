import React, { useEffect } from 'react'
import { Box, Card, CardActionArea, Container, Divider, GridList, makeStyles, Paper, Typography } from '@material-ui/core'
import data from './data.json'

const useStyles = makeStyles((theme) => ({
    root:{
        borderRadius: '20px',
    },
    listContainer: {
        overflowY: 'auto',
        overflowX: 'auto',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3)
    },
    slots: {
        height: 500,
        overflowY:'initial'
    },
    slot: {
        height: 30,
        backgroundColor: theme.palette.common.white
    },
    listHead: {
        marginBottom: theme.spacing(2)
    },
    divider: {
        backgroundColor: theme.palette.common.white
    }
}))

const Schedule = (props) => {
    const classes = useStyles()
    const { savedSchedule, save, callbackSave } = props
    const [schedule, setSchedule] = React.useState([])

    if(savedSchedule.length > 0){
        loadSchedule(savedSchedule)
    }

    useEffect(()=>{
        callbackSave(schedule)
    },
    // eslint-disable-next-line
    [save])

    return(
        <Card className={classes.root} >
            <Container className={classes.listContainer}>
                    <GridList className={classes.slots} cellHeight={50} cols={7}>
                        {data.map((item) => (                  
                            <Box key={item.title} display='flex' flexDirection='column' textAlign='center'> 
                                <Box className={classes.listHead}>
                                    <Typography variant='h4'>
                                        <b>{item.title}</b>
                                    </Typography>
                                </Box>

                            {item.slots.map((slot) => (         
                                <>
                                    {item.id===99 ? (
                                        <>
                                        <Divider className={classes.divider}/>
                                        <Box>
                                        <Paper className={classes.slot} elevation={3}>
                                            <Typography variant='h5'>
                                                    {slot.start<=12 ? (slot.start):(slot.start-12)} {slot.start<12 ? ('am'):('pm')} 
                                                    <b> - </b>
                                                    {slot.end<=12 ? (slot.end):(slot.end-12)} {slot.end<12 ? ('am'):('pm')}
                                            </Typography>
                                        </Paper>
                                        </Box>
                                        <Divider className={classes.divider}/>  
                                        </>
                                    ):( <>
                                        <Divider />       
                                        <Box>
                                                <CardActionArea className={classes.slot} id={item.title+':'+slot.start+':'+slot.end}slot={JSON.stringify({...slot, day: item.title})} onClick={handleClick} onChange={handleClick}>
                                                    <Typography variant='h4' color='secondary'>
                                                        
                                                    </Typography>
                                                </CardActionArea>
                                        </Box>     
                                        <Divider className={classes.divider}/>   
                                        </>
                                    )}
                                    
                                </>
                                                   
                            ))}
                            </Box>
                        ))}
                    </GridList>
                </Container>
        </Card>
    )

function handleClick (e) {
    let slot = {...JSON.parse(e.target.slot), id: e.target.id}
    let element = document.getElementById(e.target.id)
    let mySchedule = schedule
    if(slot.isSelect) {
        slot = {...slot,isSelect: false}
        element.style.backgroundColor= '#ffff'
        mySchedule = mySchedule.filter((item) => item.id!==slot.id)
    }
    else {
        slot = {...slot,isSelect: true}
        element.style.backgroundColor= '#a5d6a7'
        mySchedule.push(slot)
    }
    element.slot = JSON.stringify(slot)
    setSchedule(mySchedule)
}

function loadSchedule (savedSchedule) {
    console.log(savedSchedule)
    /*savedSchedule.forEach(slot => {
        let element = document.getElementById(slot.day+':'+slot.start+':'+slot.end)
        element.style.backgroundColor= '#a5d6a7'
    });   */
}
}

export default Schedule