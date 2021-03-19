import React, { useEffect, useState } from 'react'
import {CircularProgress, Container, Grid, makeStyles } from '@material-ui/core'
import Page from '../../../components/Page'
import KnowledgeAreaInfoView from './knowledgeAreaInfo'
import KnowledgeAreaListView from './knowledgeAreaList'
import Api from '../../../services/Api'

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      paddingBottom: theme.spacing(3)
    }
  }))

const ManageKnowledgeAreaView = () => {
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
                <Container>
                    <Grid container spacing={2}>
                        {loading ? (
                            <>
                            <KnowledgeAreaListView areas={knowledgeAreas}/>
                            <KnowledgeAreaInfoView />    
                            </>
                        ):(
                            <CircularProgress />
                        )}
                    </Grid>
                </Container>
            </Page>
        </>
    )
}

export default ManageKnowledgeAreaView