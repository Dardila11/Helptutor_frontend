//REACT
import React from 'react'

//COMPONENTS MATERAIL UI
import {
  Button,
  Card,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'

//COMPONENTS
import AreaCard from './areaCard'

import { useAuthState } from 'src/context'
import useTutorKnowledgeAreas from 'src/hooks/TutorHooks/useTutorKnowledgeArea'

//STYLESS
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingTop: theme.spacing(3)
  },
  containerTitle: {
    marginTop: theme.spacing(2),
    marginBlockEnd: theme.spacing(2)
  },
  actions: {
    marginTop: theme.spacing(2),
    marginBlockEnd: theme.spacing(2)
  },
  lateralView: {
    borderRadius: '20px'
  },
  button: {
    textTransform: 'none'
  }
}))

const KnowledgeAreaListView = ({handleSelect}) => {
  const user = useAuthState().user
  const { data, loading } = useTutorKnowledgeAreas(user.id)
  console.log(user)
  const classes = useStyles()
  const specialities_tutor= data

  return (
    <>
      <Grid item xs={3}>
        <Paper className={classes.lateralView} elevation={2}>
          <Card className={classes.lateralView}>
            <Typography
              className={classes.containerTitle}
              variant="h4"
              align="center">
              Áreas de conocimiento
            </Typography>
            {loading ? (
              <>
                {specialities_tutor.map((area, index) => (
                  <AreaCard
                    key={index}
                    area={area.knowledge_area}
                    my_area={area}
                    idArea={area.id}></AreaCard>
                ))}
              </>
            ) : (
              <>
                <Typography align="center">No se encontraron áreas</Typography>
              </>
            )}
            <Container className={classes.actions}>
              <Button
                className={classes.button}
                fullWidth={true}
                color="primary"
                variant="contained"
                endIcon={<AddCircleIcon />}
                onClick={handleSelect}>
                Agregar Area
              </Button>
            </Container>
          </Card>
        </Paper>
      </Grid>
    </>
  )
}

export default KnowledgeAreaListView
