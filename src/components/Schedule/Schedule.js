import React from 'react'
import { Box, Card, CardActionArea, Container, Divider, GridList, makeStyles, Paper, Typography } from '@material-ui/core'
import data from './data.json'

const useStyles = makeStyles((theme) => ({
    root:{
        borderRadius: '20px',
        width: 900
    },
    content: {
        marginLeft: theme.spacing(2),
        overflow: 'auto'
    },
    slots: {
        height: 500,
        overflowY:'initial'
    },
    title: {
        margin: theme.spacing(2)
    },
    slot: {
        height: 30
    },
    franja: {
        height: 30
    },
    listContainer: {
        overflowY: 'auto'
    }
}))

const Schedule = () => {
    const classes = useStyles()
    let schedule = data
    function handleClick (e) {
        console.log(e.target.slot)
    }
    return(
        <Card className={classes.root} >
            <Container className={classes.listContainer}>
                    <GridList className={classes.slots} cellHeight={50} cols={7}>
                        {schedule.map((item) => (                  
                            <Box display='flex' flexDirection='column' textAlign='center'> 
                                <Typography variant='h4'>
                                    <b>{item.title}</b>
                                </Typography>
                            {item.slots.map((slot) => (         
                                <>
                                    {item.id===99 ? (
                                        <>
                                        <Divider light={true}/>
                                        <Box>
                                        <Paper className={classes.franja} elevation={3}>
                                            <Typography variant='h5'>
                                                    {slot.start<=12 ? (slot.start):(slot.start-12)}{slot.start<12 ? ('am'):('pm')} 
                                                    <b>--</b>
                                                    {slot.end<=12 ? (slot.end):(slot.end-12)} {slot.end<12 ? ('am'):('pm')}
                                            </Typography>
                                        </Paper>
                                        </Box>
                                        <Divider light={true}/>  
                                        </>
                                    ):( <>
                                        <Divider />       
                                        <Box>
                                                <CardActionArea className={classes.slot} slot={JSON.stringify({...slot, day: item.title})} onClick={handleClick}>
                                                    <Typography variant='h4' color='secondary'>
                                                        
                                                    </Typography>
                                                </CardActionArea>
                                        </Box>     
                                        <Divider />   
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
}

export default Schedule