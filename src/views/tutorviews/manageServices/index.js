import React, { useEffect, useState } from 'react'
import {LinearProgress, CircularProgress, Grid, makeStyles } from '@material-ui/core'
import Page from '../../../components/Page'
import KnowledgeAreaInfoView from './knowledgeAreaInfo'
import KnowledgeAreaListView from './servicesList'
import Api from '../../../services/Api'

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark
    },
    progress: {
        marginTop: theme.spacing(5)
    }
  }))

const ManageServicesView = () => {
    const [knowledgeAreas, setKnowledgeAreas] = useState([])
    const [loading, setloading] = useState(false)
    const classes = useStyles() 
    useEffect(() => {
        const fetchData = async () => {
            await Api.getTutorKnowledgeAreas(11).then(res => {
                setKnowledgeAreas(res.data)
                setloading(true)
            });            
          };
          fetchData();
    }, [])
    return (
        <>
            <Page className={classes.root} title="Gestionar areas de conocimiento">
                    <Grid container spacing={2}>
                        {loading ? (
                            <>
                            <KnowledgeAreaListView areas={knowledgeAreas}/>
                            <KnowledgeAreaInfoView />    
                            </>
                        ):(
                            <>
                            <CircularProgress className={classes.progress}/>
                            <LinearProgress className={classes.progress}/>
                            </>
                        )}
                    </Grid>
            </Page>
        </>
    )
}

export default ManageServicesView