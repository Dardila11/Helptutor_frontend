import React from 'react'
import { Card, Grid, makeStyles, Paper, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      height: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    },
    containerTitle:{
        marginTop: theme.spacing(2),
        marginBlockEnd: theme.spacing(2)
    }
  }))

const KnowledgeAreaListView = () => {
    const classes = useStyles() 
    return (
        <>
            <Grid item xs={4}>
                <Paper className = {classes.lateralView} elevation={3}>
                    <Card>
                        <Typography className={classes.containerTitle}variant='h3' align='center'>
                            Mis areas de conocimiento
                        </Typography>
                    </Card>
                </Paper>
            </Grid>
        </>
    )
}

export default KnowledgeAreaListView