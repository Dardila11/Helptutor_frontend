import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme)=>({
    root: {
        
    },
    gridContainer: {
    }
}))

const SupportsView = () => {
    const classes = useStyles()
    return (
        <Paper className={classes.root} elevation={3}>
                <Typography variant='h4'>
                    Soportes
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography>
                            Here list supports
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Button color='primary' variant='contained'>
                            Subir Soporte
                        </Button>
                    </Grid>
                </Grid>
        </Paper>
    )
}

export default SupportsView