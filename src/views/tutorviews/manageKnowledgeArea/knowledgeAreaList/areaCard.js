import React from 'react'
import { Button, Card, makeStyles, Paper, Typography } from '@material-ui/core'
import Api from '../../../../services/Api'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles((theme) => ({
    root: {
        
        margin: theme.spacing(2),
        marginTop: theme.spacing(1),
        marginBlockEnd: theme.spacing(1)
    },
    delete: {
        float: 'right'
    }
  }))

const AreaCard = (knowledgearea) => {
    const classes = useStyles()
    const handleClick = () => {
        Api.deleteTutorKnowledgeArea(knowledgearea.idArea).then(res => {
            if(res.status == 200){
                console.log("Area eliminada correctamente")
            }else{
                console.log(res.status)
                console.log("Error eliminando el area")
            }
        })
    }
    return (
        <>
                <Paper className={classes.root}elevation={3}>
                    <Card>
                            <>
                            <Typography align='left'> 
                            {knowledgearea.area.name}
                            <Button id={knowledgearea.area.id} key={knowledgearea.area.id} onClick={handleClick}>
                                <DeleteIcon className={classes.delete}/>
                            </Button>
                            </Typography>
                            </>              
                    </Card>
                </Paper>
        </>
    )
}

export default AreaCard