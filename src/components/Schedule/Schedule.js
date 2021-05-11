import React from 'react'
import { Box, Card, CardActionArea, Container, Divider, GridList, makeStyles, Paper, Typography } from '@material-ui/core'
import data from './data.json'

const useStyles = makeStyles((theme) => ({
    root:{
        borderRadius: '20px',
        width: 900
    },
    listContainer: {
        overflowY: 'auto',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
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
        marginBottom: theme.spacing(1)
    },
    divider: {
        backgroundColor: theme.palette.common.white
    }
}))

const Schedule = () => {
    const classes = useStyles()
    let schedule = data
    function handleClick (e) {
        console.log(JSON.parse(e.target.slot))
        let element = document.getElementById(e.target.id)
        element.style.backgroundColor= '#a5d6a7'
    }
    return(
        <Card className={classes.root} >
            <Container className={classes.listContainer}>
                    <GridList className={classes.slots} cellHeight={50} cols={7}>
                        {schedule.map((item) => (                  
                            <Box display='flex' flexDirection='column' textAlign='center'> 
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
}

export default Schedule