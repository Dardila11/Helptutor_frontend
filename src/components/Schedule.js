import React from 'react'
import { Box, Card, CardActionArea, Grid, GridList, makeStyles, Paper, Typography } from '@material-ui/core'

const slots = [
    {id: 0, start: '7', end:'8', isSelect: false},
    {id: 1, start: '8', end:'9', isSelect: false},
    {id: 2, start: '9', end:'10', isSelect: false},
    {id: 3, start: '10', end:'11', isSelect: false},
    {id: 4, start: '11', end:'12', isSelect: false},
    {id: 5, start: '12', end:'13', isSelect: false},
    {id: 6, start: '13', end:'14', isSelect: false},
    {id: 7, start: '14', end:'15', isSelect: false},
    {id: 8, start: '15', end:'16', isSelect: false},
    {id: 9, start: '16', end:'17', isSelect: false},
    {id: 10, start: '17', end:'18', isSelect: false},
    {id: 11, start: '18', end:'19', isSelect: false},
    {id: 12, start: '19', end:'20', isSelect: false},
]

const days = [
    {
        id: 0,
        title: 'Lunes',
        slots: slots
    },
    {
        id: 1,
        title: 'Martes',
        slots: slots
    },
    {
        id: 2,
        title: 'Miercoles',
        slots: slots
    },
    {
        id: 3,
        title: 'Jueves',
        slots: slots
    },
    {
        id: 4,
        title: 'Viernes',
        slots: slots
    },
    {
        id: 5,
        title: 'Sabado',
        slots: slots
    }
]

const useStyles = makeStyles((theme) => ({
    root:{
        borderRadius: '20px',
        width: 900,
        height: 500,
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
    }
}))

const Schedule = () => {
    const classes = useStyles()

    return(
        <Card className={classes.root} >
            <Box className={classes.title} textAlign='center'>
            <Typography variant='h4'>
                    Horario
            </Typography>
            </Box>
            <Grid container className={classes.content}>
                <Grid item xs={1}>
                        <Typography>
                            Franja
                        </Typography>
                    <GridList cellHeight={100} cols={1}>
                        {slots.map((slot) => (                            
                                    <Typography>
                                        {slot.start} - {slot.end}
                                    </Typography>
                        ))}
                    </GridList>
                </Grid>
                <Grid item xs={11}>
                    <GridList className={classes.slots} cellHeight={100} cols={7}>
                        {days.map((item) => (                  
                            <Box display='flex' flexDirection='column' textAlign='center'> 
                                <Typography>
                                    {item.title}
                                </Typography>
                            
                            <GridList key={item.id+item.title} cellHeight={100} cols={1}>
                            {item.slots.map((slot) => (                                    
                                            <Paper elevation={3}>
                                                 <CardActionArea></CardActionArea>   
                                            </Paper>
                            ))}
                            </GridList>
                            </Box>
                        ))}
                    </GridList>
                </Grid>
            </Grid>
        </Card>
    )
}

export default Schedule