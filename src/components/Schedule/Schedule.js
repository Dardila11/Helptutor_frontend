import React from 'react'
import { Box, Card, CardActionArea, Container, Divider, GridList, makeStyles, Paper, Typography } from '@material-ui/core'
import data from './data.json'
import { isUndefined } from 'lodash-es'
import { connect } from 'react-redux'
import { addSlot, deleteSlot } from 'src/redux/actions/tutor/schedule'

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
    franja: {
        height: 30
    },
    slot: {
        height: 30,
        backgroundColor: theme.palette.common.white
    },
    slotSelected: {
        height:30,
        backgroundColor: '#a5d6a7'
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
    const { addSlot, deleteSlot, savedSchedule} = props

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
                                        <Paper className={classes.franja} elevation={3}>
                                            <Typography variant='h6'>
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
                                        {savedSchedule.length > 0 ? (
                                            <>
                                                {drawSelectedSlot(item,slot,savedSchedule)}
                                            </>
                                        ):(
                                            <CardActionArea className={classes.slot} 
                                                id={item.title+':'+slot.start+':'+slot.end}
                                                slot={JSON.stringify({...slot, day: item.title})} onClick={handleClick} onChange={handleClick}>
                                            </CardActionArea>
                                        )}
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
    if(slot.isSelect) {
        slot = {...slot,isSelect: false}
        element.style.backgroundColor= '#ffff'
        deleteSlot(slot)
    }
    else {
        slot = {...slot,isSelect: true}
        element.style.backgroundColor= '#a5d6a7'
        addSlot(slot)
    }
    element.slot = JSON.stringify(slot)
}

function drawSelectedSlot(item, slot, sche){
    let id = item.title+':'+slot.start+':'+slot.end
    let slotS = sche.filter((slots)=> slots.id===id)[0]
    if(!isUndefined(slotS)){
        console.log(slotS)
        return(
            <CardActionArea className={classes.slotSelected} 
                id={id}
                slot={JSON.stringify(slotS)} onClick={handleClick} onChange={handleClick}>
            </CardActionArea>
        )
    }else{
        return(
            <CardActionArea className={classes.slot} 
                id={item.title+':'+slot.start+':'+slot.end}
                slot={JSON.stringify({...slot, day: item.title})} onClick={handleClick} onChange={handleClick}>
            </CardActionArea>   
        )
    }
    
}

}

const mapStateToProps = (state) => ({    
  })
  
  export default connect(mapStateToProps, {
    addSlot,
    deleteSlot
  })(Schedule)