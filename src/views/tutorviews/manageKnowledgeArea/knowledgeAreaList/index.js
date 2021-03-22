import React from 'react'
import { Button, Card, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import { isUndefined } from 'lodash-es'
import AreaCard from './areaCard'

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

const KnowledgeAreaListView = (areas) => {
    const classes = useStyles()
    let info = false 
    console.log(areas)
    if (isUndefined(areas.areas) ){
        info = false
    }else{
        info = true
    }
    return (
        <>
            <Grid item xs={3}>
                <Paper className = {classes.lateralView} elevation={3}>
                    <Card>
                    <Typography className={classes.containerTitle}variant='h3' align='center'> 
                        Areas de conocimiento
                    </Typography>
                        {info? (
                            <>
                             {areas.areas.map((area, index) => (                                 
                              <AreaCard key={index} area={area.knowledge_area} idArea={area.id}></AreaCard> 
                             ))}    
                             </>
                        ):(
                            <>
                            <Typography>
                                No se encontraron areas
                            </Typography>
                            </>
                        )}
                    </Card>
                </Paper>
            </Grid>
        </>
    )
}

export default KnowledgeAreaListView